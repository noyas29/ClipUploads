from flask import Flask, request, render_template
import cloudinary
import cloudinary.uploader
import requests
import os

app = Flask(
    __name__,
    template_folder="main",   # index.html を探す場所
    static_folder="main"      # app.css, app.js を配信する場所
)

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
    file = request.files["file"]

    result = cloudinary.uploader.upload(
        file,
        resource_type="video"
    )

    video_url = result["secure_url"]

    requests.post(DISCORD_WEBHOOK, json={
    "content": f"🎬 **{title}**\n{video_url}"
    })

    return "アップロード完了"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))