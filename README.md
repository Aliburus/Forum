# Forum Uygulaması

Bu proje, kullanıcıların forum gönderileri oluşturabileceği, yorum yapabileceği ve etkileşimde bulunabileceği bir web uygulamasıdır.

## Özellikler

- Kullanıcı kaydı ve girişi
- Forum gönderileri oluşturma ve düzenleme
- Yorum yapma ve düzenleme
- Admin paneli
- Kullanıcı profili yönetimi

## Teknolojiler

### Frontend

- React
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/kullaniciadi/forum.git
cd forum
```

2. Backend bağımlılıklarını yükleyin:

```bash
cd backend
npm install
```

3. Frontend bağımlılıklarını yükleyin:

```bash
cd ../frontend
npm install
```

4. Backend için .env dosyası oluşturun:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

5. Frontend için .env dosyası oluşturun:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Çalıştırma

1. Backend'i başlatın:

```bash
cd backend
npm start
```

2. Frontend'i başlatın:

```bash
cd frontend
npm start
```

## Lisans

MIT
