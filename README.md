# Ball Press

A tiny real-time web app with a lock/unlock selector and six round ball buttons. Open it on two phones and button presses update live on both screens.

## Run locally

```bash
node server.js
```

Open <http://localhost:3000>.

## Run with Docker Compose

```bash
docker compose up --build -d
```

Open <http://localhost>.

## Simple EC2 t2.micro setup

1. Launch an Ubuntu EC2 `t2.micro` instance.
2. In the security group, allow inbound HTTP on port `80` from the internet.
3. SSH into the instance and install Docker:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io docker-compose-v2 git
   sudo systemctl enable --now docker
   ```
4. Copy or clone this project onto the instance.
5. Start the app:
   ```bash
   sudo docker compose up --build -d
   ```
6. Open `http://YOUR_EC2_PUBLIC_IP` on both phones.

The app uses Server-Sent Events for live updates and keeps the current state in memory. Restarting the server resets the selected buttons.
