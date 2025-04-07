from openai import AsyncOpenAI
import openai
import json
from core.config import settings
import re
openai.api_key = settings.OPENAI_API_KEY

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def get_tmdb_ids_from_description(media_type: str, description: str, count: int = 20) -> list[str]:
    if media_type == 'Movie':
        media = 'movie'
    else:
        media = 'tv show'

    prompt = (
        f"From the following user description:\n\n"
        f"\"{description}\"\n\n"
        f"Return exactly {count} {media} titles as a plain JSON array.\n"
        f"**Important**: Do not add any explanation, comments, or markdown. Only output raw JSON like this:\n"
        f"[\"The Matrix\", \"The Witcher\", \"Interstellar\"]"
    )

    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.7,
        )
        text = response.choices[0].message.content

        # Clean up markdown wrappers
        cleaned = re.sub(r"```json|```", "", text).strip()

        # Extract the first valid JSON array in the response
        match = re.search(r'\[.*?\]', cleaned, re.DOTALL)
        if match:
            items = json.loads(match.group())
            print(items)

            # Make sure they're strings and filter out anything invalid
            return [title for title in items if isinstance(title, str)]

        return []
    except Exception as e:
        print(f"OpenAI error: {e}")
        return []
