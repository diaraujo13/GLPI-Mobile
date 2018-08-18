Great! Now you can get started with the API!
For public read-only and anonymous resources, such as getting image info, looking up user comments, etc. all you need to do is send an authorization header with your client_id in your requests. This also works if you'd like to upload images anonymously (without the image being tied to an account), or if you'd like to create an anonymous album. This lets us know which application is accessing the API.

Authorization: Client-ID YOUR_CLIENT_ID

For accessing a user's account, please visit the OAuth2 section of the docs.

Client ID:

fdf4051d7365f50
Client secret:

edf06b1752b10a390854bcf7f364b69347b0a4cb
