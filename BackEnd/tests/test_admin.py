import pytest
from httpx import AsyncClient
from main import app
from core.config import settings

ADMIN_USERNAME = settings.ADMIN_USERNAME
ADMIN_PASSWORD = settings.ADMIN_PASSWORD


@pytest.mark.asyncio
async def test_add_admin_role_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Step 1: Register a user
        register_payload = {
            "email": "newadmin@example.com",
            "first_name": "New",
            "last_name": "Admin",
            "password": "newadminpass"
        }
        await ac.post("/register", json=register_payload)

        # Step 2: Log in as an existing admin
        login_payload = {
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        }
        login_response = await ac.post("/token", data=login_payload)
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]

        # Step 3: Add admin role to the new user
        headers = {"Authorization": f"Bearer {token}"}
        response = await ac.put(f"/add-admin/{register_payload['email']}", headers=headers)

    assert response.status_code == 200
    assert f"{register_payload['email']}" in response.json()["message"]


@pytest.mark.asyncio
async def test_delete_user_not_found():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Log in as admin
        login_payload = {
            "username": "admin@example.com",  # must exist and be admin
            "password": "adminpassword"
        }
        login_response = await ac.post("/token", data=login_payload)
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]

        headers = {"Authorization": f"Bearer {token}"}

        # Try to delete a non-existent user
        response = await ac.delete("/delete-user/999999", headers=headers)

    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_disable_user_toggle():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Step 1: Register a user
        user_payload = {
            "email": "disableme@example.com",
            "first_name": "Toggle",
            "last_name": "User",
            "password": "password123"
        }
        register_response = await ac.post("/register", json=user_payload)
        assert register_response.status_code in (200, 201)
        user_id = register_response.json().get("id") or 1  # fallback for demo

        # Log in as admin
        login_payload = {
            "username": "admin@example.com",
            "password": "adminpassword"
        }
        login_response = await ac.post("/token", data=login_payload)
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Step 2: Toggle disable
        disable_response = await ac.put(f"/disable-user/{user_id}", headers=headers)
        assert disable_response.status_code == 200
        assert "disabled" in disable_response.json()["message"].lower(
        ) or "enabled" in disable_response.json()["message"].lower()
