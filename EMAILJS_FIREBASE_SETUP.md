# 🚀 Panduan Setup EmailJS & Firebase

Panduan lengkap untuk mengonfigurasi EmailJS (contact form) dan Firebase (comments system) di portfolio Anda.

---

## 📧 PART 1: Setup EmailJS (Contact Form)

### Step 1: Buat Akun EmailJS

1. Buka [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klik **Sign Up** dan buat akun gratis
3. Verifikasi email Anda

### Step 2: Tambah Email Service

1. Di dashboard, klik **Email Services**
2. Klik **Add New Service**
3. Pilih provider email Anda (Gmail direkomendasikan):
   - **Gmail**: Paling mudah, langsung connect dengan Google account
   - **Outlook/Yahoo**: Alternatif lain
4. Klik **Connect Account** dan login
5. **Catat Service ID** (contoh: `service_abc123xyz`)

### Step 3: Buat Email Template

1. Klik **Email Templates** di sidebar
2. Klik **Create New Template**
3. Edit template dengan format berikut:

**Subject:**
```
New Contact from {{from_name}}
```

**Content/Body:**
```
You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Klik **Save**
5. **Catat Template ID** (contoh: `template_xyz789abc`)

### Step 4: Dapatkan Public Key

1. Klik ⚙️ **Account** di sidebar
2. Pilih **General** tab
3. Scroll ke bawah ke bagian **API Keys**
4. **Catat Public Key** (contoh: `your_public_key_here`)

---

## 🔥 PART 2: Setup Firebase (Comments System)

### Step 1: Buat Firebase Project

1. Buka [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Klik **Add project** / **Tambahkan project**
3. Nama project: `portfolio-sholihul` (atau nama lain yang Anda suka)
4. **Disable Google Analytics** (tidak perlu untuk project ini)
5. Klik **Create project**
6. Tunggu sampai project selesai dibuat (~30 detik)

### Step 2: Setup Firestore Database

1. Di sidebar, klik **Build** → **Firestore Database**
2. Klik **Create database**
3. **Pilih mode**: Start in **production mode**
4. **Pilih location**: 
   - `asia-southeast1 (Singapore)` - recommended untuk Indonesia
   - Atau pilih yang terdekat dengan lokasi Anda
5. Klik **Enable**
6. Tunggu sampai database aktif

### Step 3: Konfigurasi Firestore Rules

1. Setelah database dibuat, klik tab **Rules**
2. **Hapus semua isi** dan ganti dengan rules berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read for all comments
    match /comments/{commentId} {
      // Anyone can read comments
      allow read: if true;
      
      // Anyone can create comments with validation
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'timestamp']) 
                    && request.resource.data.name is string 
                    && request.resource.data.message is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.message.size() > 0
                    && request.resource.data.name.size() <= 100
                    && request.resource.data.message.size() <= 500;
      
      // No one can update or delete comments (for security)
      allow update, delete: if false;
    }
  }
}
```

3. Klik **Publish**
4. Konfirmasi dengan klik **Publish** lagi

**Penjelasan Rules:**
- ✅ Semua orang bisa **membaca** comments
- ✅ Semua orang bisa **membuat** comment (dengan validasi)
- ❌ Tidak ada yang bisa **mengubah** atau **menghapus** comment (untuk keamanan)
- Validasi: Name max 100 char, Message max 500 char

### Step 4: Dapatkan Firebase Config

1. Klik ⚙️ **Settings** (icon gear) di sidebar
2. Pilih **Project settings**
3. Scroll ke bawah ke bagian **Your apps**
4. Klik icon **Web** `</>`
5. **App nickname**: `portfolio-web` (atau nama lain)
6. **Jangan centang** "Firebase Hosting"
7. Klik **Register app**
8. Anda akan melihat **Firebase configuration object** seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

9. **Catat semua nilai** dari object tersebut (akan digunakan di langkah berikutnya)

---

## ⚙️ PART 3: Konfigurasi Environment Variables

### Step 1: Buat File `.env.local`

1. Di root folder project Anda, buat file baru bernama **`.env.local`**
2. Paste kode berikut:

```env
# ===================================
# EmailJS Configuration
# ===================================
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# ===================================
# Firebase Configuration
# ===================================
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### Step 2: Replace Placeholder Values

**Ganti semua `your_*_here`** dengan nilai yang sudah Anda catat:

#### EmailJS (dari PART 1):
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123xyz
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789abc
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_from_emailjs
```

#### Firebase (dari PART 2 Step 4):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=portfolio-sholihul.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=portfolio-sholihul
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portfolio-sholihul.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 3: Save & Restart

1. **Save** file `.env.local`
2. **PENTING**: Jika development server sedang running, **restart** dengan:
   ```bash
   # Stop server (Ctrl + C)
   # Start lagi
   npm run dev
   ```

---

## ✅ Testing

### Test Contact Form (EmailJS)

1. Buka halaman Contact di portfolio Anda
2. Isi form "Get In Touch":
   - Name: Test User
   - Email: your-email@example.com
   - Message: This is a test message
3. Klik **Send Message**
4. Tunggu beberapa detik
5. ✅ Cek email Anda (email yang terhubung di EmailJS)
6. Anda harus menerima email dengan subject "New Contact from Test User"

**Troubleshooting EmailJS:**
- Jika error: Cek semua environment variables sudah benar
- Jika tidak terima email: Cek spam folder
- Jika masih error: Cek di EmailJS Dashboard → Email Services → pastikan service masih active

### Test Comments (Firebase)

1. Di halaman Contact, scroll ke bagian "Comments"
2. Isi form comment:
   - Name: Test User
   - Message: This is my first comment!
3. Klik **Post Comment**
4. ✅ Comment harus langsung muncul di list comments
5. Refresh halaman - comment harus tetap ada (tersimpan di Firebase)

**Verifikasi di Firebase Console:**
1. Buka Firebase Console
2. Go to **Firestore Database**
3. Lihat collection `comments`
4. Anda harus melihat document baru dengan data comment Anda

**Troubleshooting Firebase:**
- Jika error saat post: Cek Firestore Rules sudah dipublish
- Jika comment tidak muncul: Cek environment variables Firebase
- Jika error "Permission denied": Cek rules, pastikan `allow create: if true` atau rules validation benar

---

## 🔒 Security Notes

### EmailJS
- ✅ Public key aman untuk di-expose (sudah ada rate limiting)
- ✅ Gratis untuk 200 emails/bulan
- ⚠️ Jangan share Service ID & Template ID di repository public

### Firebase
- ✅ API Key aman untuk di-expose di client-side (sudah ada Firebase Security Rules)
- ✅ Security diatur lewat Firestore Rules, bukan API key
- ✅ Free tier: 50K reads, 20K writes per day (lebih dari cukup untuk portfolio)
- ⚠️ **PENTING**: Pastikan Firestore Rules sudah benar (sudah kita atur di PART 2)

### .env.local
- ✅ File `.env.local` sudah ada di `.gitignore` (tidak akan ter-commit ke Git)
- ✅ Aman untuk menyimpan credentials di file ini
- ⚠️ **JANGAN** commit file `.env.local` ke Git/GitHub!

---

## 📊 Monitoring

### EmailJS Dashboard
- Lihat email terkirim: [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
- Cek quota: Free plan = 200 emails/month
- View history: Klik service Anda → History

### Firebase Console
- Lihat comments: [Firebase Console](https://console.firebase.google.com/) → Firestore Database
- Monitor usage: Klik **Usage** tab
- View logs: Klik **Rules** tab → Playground (untuk test rules)

---

## 🚀 Production Deployment

Saat deploy ke production (Vercel/Netlify):

1. **Jangan lupa** tambahkan environment variables di dashboard hosting Anda
2. Add semua variabel dari `.env.local`
3. Format sama: `NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123`
4. Rebuild/redeploy aplikasi

### Vercel:
- Project Settings → Environment Variables → Add all variables

### Netlify:
- Site Settings → Build & Deploy → Environment → Add all variables

---

## 📝 Summary Checklist

- [ ] EmailJS account created
- [ ] Email service connected (Gmail)
- [ ] Email template created with {{from_name}}, {{from_email}}, {{message}}
- [ ] Noted: Service ID, Template ID, Public Key
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Firestore Rules configured and published
- [ ] Noted: All Firebase config values
- [ ] `.env.local` file created in project root
- [ ] All environment variables filled correctly
- [ ] Development server restarted
- [ ] Contact form tested (email received)
- [ ] Comments tested (saved to Firebase)
- [ ] Checked Firebase Console (comments visible)
- [ ] Checked EmailJS Dashboard (email sent)

---

## 💡 Tips

1. **Backup your `.env.local`**: Save kredensial di tempat aman (1Password, LastPass, dll)
2. **Test di incognito**: Untuk memastikan works untuk user baru
3. **Monitor quota**: Cek EmailJS & Firebase usage regularly
4. **Comments moderation**: Untuk hapus spam, akses Firebase Console → Firestore → Delete document
5. **Email customization**: Edit EmailJS template untuk customize format email

---

## 🆘 Need Help?

Jika ada error atau pertanyaan:

1. Cek console browser (F12) untuk error messages
2. Cek terminal untuk server-side errors
3. Verifikasi semua environment variables
4. Test Firebase connection di Console
5. Check EmailJS service status

**Common Errors:**

- `process.env.NEXT_PUBLIC_* is undefined`: Environment variables tidak dimuat, restart server
- `Permission denied`: Firestore Rules belum benar atau belum dipublish
- `Invalid service/template ID`: Double check IDs di EmailJS dashboard
- `Network error`: Check internet connection & Firebase project settings

---

**Setup complete!** 🎉

Your contact form and comments system are now fully functional and connected to EmailJS and Firebase!

