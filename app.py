from flask import Flask, request, render_template
import cloudinary
import cloudinary.uploader
import requests
import os

app = Flask(__name__)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    title = request.form["title"]
    file = request.files["video"]

    result = cloudinary.uploader.upload(
        file,
        resource_type="video"
    )

    video_url = result["secure_url"]

    requests.post(DISCORD_WEBHOOK, json={
    "content": f"🎬 **{title}**\n{video_url}"
    })

    return "アップロード完了"

app.run()