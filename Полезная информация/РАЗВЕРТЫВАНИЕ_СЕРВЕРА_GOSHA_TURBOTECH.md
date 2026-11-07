# 🏎️ ПОЛНЫЙ ГАЙД: БОЕВОЕ РАЗВЕРТЫВАНИЕ GOSHA TURBOTECH НА VDS СЕРВЕРЕ

> **Для кого:** Для технического релиза сайта GoshaTurboTech, Даниила, Зураба и передачи проекта.  
> **Стек:** Linux Ubuntu 24.04 LTS + Python 3.12 (FastAPI / Uvicorn) + SQLite (WAL mode) + Nginx (кэширование, Gzip, SSL Certbot) + Systemd (автозапуск 24/7).

---

## 🛠️ 1. ВЫБОР И ПОКУПКА СЕРВЕРА (VDS)

Рекомендуемый хостинг: **Selectel** или **Timeweb Cloud** (ДЦ Москва или Санкт-Петербург).
* **ОС:** `Ubuntu 24.04 LTS` (чистый образ без предустановленных панелей).
* **Конфигурация:**
  * CPU: 2 ядра vCPU
  * RAM: 4 ГБ RAM (минимум 2 ГБ, но 4 ГБ лучше для одновременного стриминга тяжелых видео)
  * Диск: 40–60 ГБ NVMe
  * Сеть: 100 Мбит/с – 1 Гбит/с, статический публичный IPv4-адрес.
* Стоимость: ~600 – 900 ₽ в месяц.

---

## 🔑 2. ПОДКЛЮЧЕНИЕ К СЕРВЕРУ ПО SSH

В терминале на твоем Mac выполни:
```bash
ssh root@IP_АДРЕС_СЕРВЕРА
# Введи пароль от сервера, который пришел на почту или задан при создании
```

---

## ⚙️ 3. ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА И УСТАНОВКА ПАКЕТОВ

Выполни в консоли сервера одной пачкой:
```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Python, Nginx, Git, Certbot и полезных утилит
apt install -y python3 python3-pip python3-venv nginx git certbot python3-certbot-nginx curl ufw htop

# Настройка файрвола (UFW)
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

---

## 📦 4. КЛОНИРОВАНИЕ ПРОЕКТА И ОКРУЖЕНИЕ PYTHON

```bash
# Создаем рабочую папку для сайта
mkdir -p /var/www/goshaturbotech
cd /var/www/goshaturbotech

# Клонируем проект из GitHub (или загружаем через rsync/scp)
git clone https://github.com/ilavacik2-ux/goshaturbotech.git .

# Создаем виртуальное окружение Python
python3 -m venv venv
source venv/bin/activate

# Устанавливаем зависимости
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🔄 5. НАСТРОЙКА СЛУЖБЫ АВТОЗАПУСКА (SYSTEMD)

В проекте уже есть готовый конфигурационный файл в папке `deploy/goshaturbotech.service`.

1. Копируем файл службы в системную директорию:
```bash
cp deploy/goshaturbotech.service /etc/systemd/system/goshaturbotech.service
```

2. Если пути или имя пользователя отличаются, открываем и проверяем:
```bash
nano /etc/systemd/system/goshaturbotech.service
```
*(Убедись, что `WorkingDirectory=/var/www/goshaturbotech` и путь к `gunicorn/uvicorn` верный: `/var/www/goshaturbotech/venv/bin/uvicorn`).*

3. Активируем и запускаем сервис:
```bash
systemctl daemon-reload
systemctl enable goshaturbotech
systemctl start goshaturbotech

# Проверяем статус (должно гореть зеленым active (running))
systemctl status goshaturbotech
```

---

## 🌐 6. НАСТРОЙКА ВЕБ-СЕРВЕРА NGINX И SSL

В проекте уже подготовлен конфиг `deploy/nginx.conf` с настроенным кэшированием статики, сжатием Gzip и защитой от перегрузок.

1. Копируем конфиг Nginx:
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/goshaturbotech
ln -s /etc/nginx/sites-available/goshaturbotech /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
```

2. Открываем конфиг и указываем боевой домен Гоши (например, `goshaturbotech.com` и `www.goshaturbotech.com`):
```bash
nano /etc/nginx/sites-available/goshaturbotech
```

3. Проверяем синтаксис и перезапускаем Nginx:
```bash
nginx -t
systemctl restart nginx
```

4. **Выпускаем бесплатный официальный SSL-сертификат HTTPS:**
*(Домен уже должен указывать на IP сервера в DNS!)*
```bash
certbot --nginx -d goshaturbotech.com -d www.goshaturbotech.com
```
Certbot автоматически пропишет SSL-сертификаты в Nginx и настроит автопродление каждые 90 дней.

---

## 💾 7. АВТОМАТИЧЕСКИЙ БЭКАП БАЗЫ ДАННЫХ

Чтобы база данных `gtt_database.db` с автомобилями, галереей и паролями никогда не потерялась, настраиваем ежедневный бэкап:

1. Открываем планировщик задач:
```bash
crontab -e
```
2. Добавляем строчку (бэкап каждую ночь в 03:00):
```cron
0 3 * * * sqlite3 /var/www/goshaturbotech/gtt_database.db ".backup '/var/backups/gtt_backup_$(date +\%Y\%m\%d).db'"
```

---

## ⚡ 8. ОБНОВЛЕНИЕ САЙТА В ОДНУ КОМАНДУ (DEPLOY SCRIPT)

Когда ты или Даниил вносите изменения в код на GitHub, на боевом сервере достаточно выполнить:
```bash
cd /var/www/goshaturbotech
git pull origin main
systemctl restart goshaturbotech
```
Сайт обновится за 2 секунды без простоя для пользователей.
