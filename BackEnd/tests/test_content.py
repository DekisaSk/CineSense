import pytest
from httpx import AsyncClient
from main import app


@pytest.mark.asyncio
async def test_add_favorite_movie_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Step 1: Register and login user
        user_payload = {
            "email": "movielover@example.com",
            "first_name": "Movie",
            "last_name": "Lover",
            "password": "moviepass123"
        }
        await ac.post("/register", json=user_payload)

        login_response = await ac.post("/token", data={
            "username": user_payload["email"],
            "password": user_payload["password"]
        })
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        # Add movie 1165067 to favorites
        response = await ac.post("/movies/favorite/1165067", headers=headers)

    assert response.status_code == 201 or response.status_code == 200
    assert "message" in response.json() or response.json() != {}


@pytest.mark.asyncio
async def test_is_tv_show_favorite():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Step 1: Register and login user
        user_payload = {
            "email": "tvfan@example.com",
            "first_name": "TV",
            "last_name": "Fan",
            "password": "tvpass123"
        }
        await ac.post("/register", json=user_payload)

        login_response = await ac.post("/token", data={
            "username": user_payload["email"],
            "password": user_payload["password"]
        })
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Step 2: Add TV show with ID 111803 to favorites
        await ac.post("/tv-shows/favorite/111803", headers=headers)

        # Step 3: Check if it’s in favorites
        response = await ac.get("/tv-shows/favorite/1", headers=headers)

    assert response.status_code == 200
    assert response.json() is True or response.json() == {"is_favorite": True}
