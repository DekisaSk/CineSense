import asyncio
import aiohttp
import random
import csv
import time
import requests
import json
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='tmdb_scraper.log',
    filemode='a'
)

API_KEY = "placeholder"
# Starting IDs
MOVIE_ID_START = 1
TV_ID_START = 1

# CSV output filenames
MOVIES_CSV = "movies_credits.csv"
TV_CSV = "tv_credits.csv"

# Maximum retries if error
MAX_RETRIES = 3
RETRY_BACKOFF = 10

# Per-proxy concurrent request limit (e.g., 2 simultaneous requests per proxy)
PER_PROXY_LIMIT = 49


def load_proxies(filename="Webshare 20 proxies.txt"):
    proxies = []
    with open(filename, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            # format: ip:port:username:password
            parts = line.split(":")
            if len(parts) != 4:
                continue
            ip, port, username, password = parts
            proxy_url = f"http://{username}:{password}@{ip}:{port}"
            proxies.append(proxy_url)
    return proxies


PROXIES = load_proxies()


def get_latest_ids():
    latest_movie_url = "https://api.themoviedb.org/3/movie/latest"
    latest_tv_url = "https://api.themoviedb.org/3/tv/latest"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    try:
        movie_resp = requests.get(
            latest_movie_url, headers=headers, timeout=10)
        tv_resp = requests.get(latest_tv_url, headers=headers, timeout=10)
        movie_resp.raise_for_status()
        tv_resp.raise_for_status()
        latest_movie_id = movie_resp.json().get("id")
        latest_tv_id = tv_resp.json().get("id")
        logging.info(f"Latest TMDB movie ID: {latest_movie_id}")
        logging.info(f"Latest TMDB TV ID: {latest_tv_id}")
        return latest_movie_id, latest_tv_id
    except Exception as e:
        logging.error(f"Error fetching latest IDs: {e}")
        return MOVIE_ID_START + 100000, TV_ID_START + 100000


def flatten_response(resp: dict) -> dict:

    flat = {}
    for key, value in resp.items():
        if isinstance(value, (list, dict)):
            try:
                flat[key] = json.dumps(value)
            except Exception:
                flat[key] = str(value)
        else:
            flat[key] = value
    return flat


async def fetch_with_retry(url: str, session: aiohttp.ClientSession, proxy_semaphores: dict, retries=MAX_RETRIES):
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    attempt = 0
    while attempt <= retries:
        proxy = random.choice(PROXIES)
        async with proxy_semaphores[proxy]:
            try:
                async with session.get(url, headers=headers, proxy=proxy, timeout=10) as response:
                    if response.status == 200:
                        return await response.json()
                    elif response.status == 429:
                        logging.warning(
                            f"429 for URL {url} using proxy {proxy}. Backing off for {RETRY_BACKOFF} seconds...")
                        await asyncio.sleep(RETRY_BACKOFF)
                    else:
                        logging.info(
                            f"Non-200 status {response.status} for URL {url}")
                        return None
            except Exception as e:
                logging.error(f"Error fetching {url} using proxy {proxy}: {e}")
        attempt += 1
        await asyncio.sleep(RETRY_BACKOFF)
    return None


async def fetch_movie(movie_id: int, session: aiohttp.ClientSession, proxy_semaphores: dict):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits"
    data = await fetch_with_retry(url, session, proxy_semaphores)
    return movie_id, data


async def fetch_tv(tv_id: int, session: aiohttp.ClientSession, proxy_semaphores: dict):
    url = f"https://api.themoviedb.org/3/tv/{tv_id}/aggregate_credits"
    data = await fetch_with_retry(url, session, proxy_semaphores)
    return tv_id, data


async def fetch_batch(ids, fetch_func, proxy_semaphores: dict):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_func(i, session, proxy_semaphores) for i in ids]
        return await asyncio.gather(*tasks)


def write_csv_dynamic(filename: str, data: list):
    all_keys = set()
    for row in data:
        all_keys.update(row.keys())
    columns = sorted(all_keys)
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        for row in data:
            writer.writerow(row)


async def async_main():
    latest_movie_id, latest_tv_id = get_latest_ids()
    MOVIE_ID_END = latest_movie_id + 1
    TV_ID_END = latest_tv_id + 1

    proxy_semaphores = {proxy: asyncio.Semaphore(
        PER_PROXY_LIMIT) for proxy in PROXIES}

    movies_data = []
    tv_data = []

    logging.info(
        f"Starting TMDB movie scraping from ID {MOVIE_ID_START} to {MOVIE_ID_END - 1}...")
    batch_size = PER_PROXY_LIMIT * len(PROXIES)
    for i in range(MOVIE_ID_START, MOVIE_ID_END, batch_size):
        batch = list(range(i, min(i + batch_size, MOVIE_ID_END)))
        results = await fetch_batch(batch, fetch_movie, proxy_semaphores)
        for movie_id, result in results:
            if result:
                flat = flatten_response(result)
                movies_data.append(flat)
                logging.info(f"Movie {movie_id} found: {flat.get('id')}")
        logging.info(
            f"Processed up to movie ID {i + batch_size - 1}. Sleeping briefly...")
        await asyncio.sleep(1)

    logging.info(
        f"Starting TMDB TV scraping from ID {TV_ID_START} to {TV_ID_END - 1}...")
    for i in range(TV_ID_START, TV_ID_END, batch_size):
        batch = list(range(i, min(i + batch_size, TV_ID_END)))
        results = await fetch_batch(batch, fetch_tv, proxy_semaphores)
        for tv_id, result in results:
            if result:
                flat = flatten_response(result)
                tv_data.append(flat)
                logging.info(f"TV {tv_id} found: {flat.get('id')}")
        logging.info(
            f"Processed up to TV ID {i + batch_size - 1}. Sleeping briefly...")
        await asyncio.sleep(1)

    return movies_data, tv_data


def main():
    movies_data, tv_data = asyncio.run(async_main())
    logging.info(
        f"Scraped {len(movies_data)} valid movie entries. Writing to {MOVIES_CSV} ...")
    write_csv_dynamic(MOVIES_CSV, movies_data)
    logging.info(
        f"Scraped {len(tv_data)} valid TV entries. Writing to {TV_CSV} ...")
    write_csv_dynamic(TV_CSV, tv_data)
    logging.info("Scraping complete.")


if __name__ == "__main__":
    main()
