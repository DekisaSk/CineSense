import pytest
from httpx import AsyncClient
from main import app


@pytest.mark.asyncio
async def test_register_user():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        payload = {
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "securepassword123"
        }
        response = await ac.post("/register", json=payload)

        assert response.status_code in [200, 201]
        assert "id" in response.json() or "message" in response.json()


@pytest.mark.asyncio
async def test_login_for_access_token_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/token", data={
            "username": "testuser@example.com",
            "password": "securepassword123"
        })

        assert response.status_code == 200
        assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_user_info_requires_auth():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/user-info")
        assert response.status_code == 401


@pytest.mark.asyncio
async def test_check_authorisation_user_access():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Login to get token
        login_response = await ac.post("/token", data={
            "username": "testuser@example.com",
            "password": "securepassword123"
        })

        assert login_response.status_code == 200
        token = login_response.json()["access_token"]

        headers = {"Authorization": f"Bearer {token}"}
        response = await ac.get("/check-authorisation", headers=headers)

        assert response.status_code == 200
        assert response.json().get("access") is True


@pytest.mark.asyncio
async def test_update_user_info_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        login_response = await ac.post("/token", data={
            "username": "testuser@example.com",
            "password": "securepassword123"
        })

        assert login_response.status_code == 200
        token = login_response.json()["access_token"]

        payload = {
            "first_name": "UpdatedName",
            "last_name": "UpdatedLast",
            "email": "testuser@example.com"
        }
        headers = {"Authorization": f"Bearer {token}"}

        response = await ac.put("/update-user-info", json=payload, headers=headers)

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "User info updated successfully"
        assert data["user"]["first_name"] == "UpdatedName"
        assert data["user"]["last_name"] == "UpdatedLast"
