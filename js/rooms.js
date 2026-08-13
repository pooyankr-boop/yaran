/* ساختار محتوای اتاق‌ها — غنی‌شده با محتوای واقعی (کاربرگ‌های سمیه‌روحی + جست‌وجوی عمیق وب) */
const ZONE_POSITIONS = {"hero": {"left": {"x": 16, "y": 62}, "center": {"x": 50, "y": 58}, "right": {"x": 84, "y": 62}}, "herog": {"left": {"x": 20, "y": 55}, "center": {"x": 50, "y": 55}, "right": {"x": 80, "y": 55}}, "herog_left": {"left": {"x": 28, "y": 55}, "center": {"x": 55, "y": 55}, "right": {"x": 82, "y": 55}}, "herog_right": {"left": {"x": 18, "y": 55}, "center": {"x": 45, "y": 55}, "right": {"x": 72, "y": 55}}};

const ENTRY_DOORS = [{"label": "ورودی کودک", "x": 16.5, "y": 77, "role": "child"}, {"label": "ورودی مربی", "x": 29, "y": 83, "role": "teacher"}, {"label": "ورودی والد", "x": 69, "y": 88, "role": "parent"}, {"label": "ورودی مدیر و کارکنان", "x": 79, "y": 80, "role": "manager"}];

const ROOMS = [
  {
    "id": "amoozesh",
    "folder": "amoozesh",
    "name": "اتاق آموزش",
    "icon": "📚",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 55
      },
      "center": {
        "x": 45,
        "y": 60
      },
      "right": {
        "x": 85,
        "y": 45
      }
    },
    "views": {
      "herog": {
        "label": "حروف، کلمات، داستان و شعر",
        "hotspots": [
          {
            "title": "حروف",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "نوشتن عدد ۱ تا ۵",
                    "type": "activity",
                    "desc": "نوشتن اعداد ۱ تا ۵",
                    "category": "شناخت اعداد",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "مداد, کاغذ, کاربرگ نقطه‌چین",
                    "instructions": "عدد ۱ را روی کاغذ بنویسید → از کودک بخواهید تقلید کند → با هم اعداد ۲ تا ۵ را تمرین کنید → کاربرگ نقطه‌چین را تکمیل کنید",
                    "safety": ""
                  },
                  {
                    "title": "آزمون ریاضی پیش دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/223py.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/22opy.webp",
                    "desc": "این فایل مربوط به آزمون پایانی برای نوآموزان پیش دبستانی است که بر مفاهیم پایه ریاضی تمرکز دارد. جهت آمادگی برای آزمون ریاضی پیش دبستان این فایل را دریافت کنید."
                  },
                  {
                    "title": "آموزش ریاضی عدد۲پیش دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/1-36.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-20-1.webp",
                    "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."
                  },
                  {
                    "title": "آموزش عدد ۸ به پیش دبستانی ها",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/8.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/81.jpg",
                    "desc": "این کاربرگ آموزشی برای کودکان پیش‌دبستانی طراحی شده و هدف آن آموزش عدد ۸ به پیش دبستانی به شیوه‌ای جذاب و تصویری است. در مرکز تصویر، عدد ۸ با رنگ زرد و به"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "دسته‌بندی اشیاء",
                    "type": "activity",
                    "desc": "تقویت مهارت دسته‌بندی و طبقه‌بندی",
                    "category": "مهارت شناختی",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "اشیاء مختلف",
                    "instructions": "اشیاء مختلف را روی میز بگذارید → از کودک بخواهید آنها را دسته‌بندی کند → راهنمایی کنید: بر اساس رنگ، شکل، یا کاربرد → دسته‌ها را نام‌گذاری کنید",
                    "safety": "از اشیاء امن استفاده کنید"
                  },
                  {
                    "title": "تکلیف رایگان دقت و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-دقت-تمرکز-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-دقت-تمرکز-پیش-دبستان.webp",
                    "desc": "آیا به دنبال یک فعالیت آموزشی جذاب برای افزایش تمرکز فرزند خود هستید؟ کاربرگ دقت و تمرکز پیش‌دبستانی که در تصویر مشاهده می‌کنید، یک ابزار فوق‌العاده برای"
                  },
                  {
                    "title": "دانلود کاربرگ هوش و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-هوش-و-تمرکز-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-هوش-و-تمرکز-پیش-دبستان.webp",
                    "desc": "این کاربرگ هوش و تمرکز پیش دبستان فرصتی عالی برای پرورش مهارت‌های شناختی و حل مسئله در کودکان شماست. هدف اصلی ما در این فعالیت ساده این است که بچه‌ها با پیدا"
                  },
                  {
                    "title": "مجموعه کاربرگ‌های هوش پیش‌دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "کلمات",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "کلمات",
                "items": [
                  {
                    "title": "شناخت حروف الفبا",
                    "type": "activity",
                    "desc": "آشنایی با حروف الفبای فارسی",
                    "category": "شناخت حروف",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کارت حروف, تصاویر کلمات",
                    "instructions": "کارت حروف را نشان دهید → صدای هر حرف را بگویید → کلمه‌ای با آن حرف بسازید → از کودک بخواهید تکرار کند",
                    "safety": ""
                  },
                  {
                    "title": "آزمون فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "آزمون فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IMG_3404-copy.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/s62py.webp",
                    "desc": "هدف امتحان فارسی پیش دبستانی سنجش درک مفاهیم پایه مانند تشخیص جهت‌ها (چپ و راست)، شناخت نیازهای رشد گیاهان و شناسایی موجودات زنده طراحی شده است."
                  },
                  {
                    "title": "تکلیف فارسی با صدا اول «ت» پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-فارسی-با-صدا-اول-ت-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-فارسی-با-صدا-اول-ت-پیش-دبستان.webp",
                    "desc": "یادگیری حروف الفبا و تشخیص صداهای اول کلمات، یکی از مهم‌ترین پایه‌های سوادآموزی در دوران پیش‌دبستان است. تکلیف فارسی با صدا اول «ت» پیش دبستان یکی از حروف"
                  }
                ]
              }
            ]
          },
          {
            "title": "داستان",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "داستان",
                "items": [
                  {
                    "title": "ردیابی حرف",
                    "type": "activity",
                    "desc": "تمرین نوشتن حروف با ردیابی",
                    "category": "شناخت حروف",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "کاربرگ نقطه‌چین, مداد",
                    "instructions": "کاربرگ نقطه‌چین را به کودک بدهید → نحوه ردیابی را نشان دهید → از کودک بخواهید با انگشت ردیابی کند → سپس با مداد تکرار کند",
                    "safety": ""
                  },
                  {
                    "title": "تکلیف فارسی نشانه «ث» پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "مجموعه واحد کار آموزش خانواده فارسی اول دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مجموعه-واحد-کار-آموزش-خانواده-فارسی-پایه-اول.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مجموعه-واحد-کار-آموزش-خانواده-فارسی-پایه-اول.webp",
                    "desc": "آموزش مفاهیم مهم اجتماعی مانند خانواده، از طریق فعالیت‌های سرگرم‌کننده و بصری، در پایه اول دبستان بسیار مؤثر است. این کاربرگ آموزشی، با ارائه تصویری شاد و"
                  },
                  {
                    "title": "کاربرگ‌های حروف الفبا: آموزش الفبای فارسی با رنگ و بازی",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ‌های-حروف-الفبا.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ‌های-حروف-الفبا.webp",
                    "desc": "کاربرگ‌های حروف الفبا ابزاری عالی برای والدین، مربیان مهدکودک و معلمان کلاس اول هستند تا مفاهیم پایه زبان فارسی را به کودکان آموزش دهند."
                  }
                ]
              }
            ]
          },
          {
            "title": "شعر",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "شعر",
                "items": [
                  {
                    "title": "شناخت شکل‌های هندسی",
                    "type": "activity",
                    "desc": "شناخت شکل‌های دایره، مربع، مثلث",
                    "category": "شناخت شکل",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "اشیاء با شکل‌های مختلف",
                    "instructions": "اشیاء با شکل‌های مختلف را نشان دهید → نام هر شکل را بگویید → از کودک بخواهید شکل‌ها را پیدا کند → با هم اشیاء هم‌شکل را جمع کنید",
                    "safety": ""
                  },
                  {
                    "title": "آموزش و مرور اشکال هندسی تلفیق با هنر پیش دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "تمرین تابستانه جمع ریاضی پیش دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "تکلیف رایگان هوش ریاضی پیش دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "شمارش، شکل‌ها، مقایسه و ترتیب",
        "hotspots": [
          {
            "title": "شمارش",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "شناخت رنگ‌های اصلی",
                    "type": "game",
                    "desc": "شناخت رنگ‌های قرمز، آبی، زرد، سبز",
                    "category": "شناخت رنگ",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "اشیاء رنگی, کاربرگ رنگ‌آمیزی",
                    "instructions": "اشیاء رنگی مختلف را نشان دهید → از کودک بخواهید هر رنگ را نام ببرد → با هم اشیاء هم‌رنگ را جمع کنید → کاربرگ رنگ‌آمیزی را انجام دهید",
                    "safety": "از رنگ‌های غیرسمی استفاده کنید",
                    "game": "color-hunt"
                  },
                  {
                    "title": "تکلیف آموزش رنگ آمیزی پیش دبستان",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "تکلیف رنگ آمیزی پیش دبستان",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی-1.webp",
                    "desc": "آیا به دنبال یک فعالیت جذاب و آرامش‌بخش برای کودک خود هستید؟ کاربرگ رنگ آمیزی گربه که در تصویر مشاهده می‌کنید، یک ابزار فوق‌العاده برای تقویت مهارت‌های حرکتی"
                  },
                  {
                    "title": "داناود رایگان کاربرگ رنگ آمیزی پیش دبستان",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی.webp",
                    "desc": "داناود رایگان کاربرگ رنگ آمیزی پیش دبستان: این یک کاربرگ رنگ‌آمیزی برای کودکان پیش‌دبستانی است که به آن‌ها کمک می‌کند تا مهارت‌های حرکتی ظریف و تشخیص رنگ خود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "شمارش ۱ تا ۱۰",
                    "type": "activity",
                    "desc": "شمارش اعداد ۱ تا ۱۰",
                    "category": "شناخت اعداد",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "اشیاء کوچک, کاربرگ اعداد",
                    "instructions": "اشیاء کوچک را به کودک بدهید → از کودک بخواهید بشمارد → با هم اعداد را تکرار کنید → کاربرگ اعداد را انجام دهید",
                    "safety": "از اشیاء بزرگ و امن استفاده کنید"
                  },
                  {
                    "title": "تکلیف ریاضی آشنایی با عدد دو (۲) مرور تابستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تکلیف-ریاضی-آشنایی-با-عدد-دو-۲-مرور-تابستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تکلیف-ریاضی-آشنایی-با-عدد-دو-۲-مرور-تابستان.webp",
                    "desc": "یادگیری اعداد، خشت اول بنای ریاضیات است. عدد «۲» به عنوان یکی از اولین مفاهیمی که کودک با آن آشنا می‌شود، نقش مهمی در درک مفهوم «جفت» و «مقدار» دارد. کاربرگ"
                  },
                  {
                    "title": "تکلیف ریاضی آشنایی با عدد ۹ مرور تابستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "دانلود واحد کار ریاضی تم 6 پایه اول دبستان",
                    "type": "pdf",
                    "category": "ریاضی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "شکل‌ها",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "شکل‌ها",
                "items": [
                  {
                    "title": "ترکیب رنگ‌ها",
                    "type": "activity",
                    "desc": "درک مفهوم ترکیب رنگ‌ها",
                    "category": "شناخت رنگ",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "رنگ انگشتی, ظرف آب",
                    "instructions": "دو رنگ اصلی را انتخاب کنید → آنها را با هم مخلوط کنید → نتیجه را به کودک نشان دهید → از کودک بخواهید رنگ جدید را نام ببرد",
                    "safety": "از رنگ‌های غیرسمی استفاده کنید"
                  },
                  {
                    "title": "دانلود رایگان کاربرگ رنگ آمیزی پیش دبستانی",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "دانلود کاربرگ رنگ‌آمیزی؛ فعالیتی جذاب برای افزایش تمرکز و خلاقیت دانش‌آموزان دبستانی",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-جذاب-رنگ-آمیزی-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-جذاب-رنگ-آمیزی-دبستان.webp",
                    "desc": "دنیای رنگ‌ها، ساده‌ترین و در عین حال موثرترین راه برای ورود به دنیای آرامش و خلاقیت کودکان است. کاربرگ رنگ‌آمیزی که پیش رو دارید، با طراحی اختصاصی و الگوهای"
                  },
                  {
                    "title": "دانلود کاربرگ رنگ آمیزی سبزیجات پیش دبستانی",
                    "type": "pdf",
                    "category": "رنگ‌آمیزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T152911.373.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T152829.624.webp",
                    "desc": "کاربرگ رنگ آمیزی سبزیجات شامل طرح‌های مختلفی از انواع سبزیجات است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."
                  }
                ]
              }
            ]
          },
          {
            "title": "مقایسه",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "مقایسه",
                "items": [
                  {
                    "title": "شناخت فصل‌ها",
                    "type": "activity",
                    "desc": "شناخت چهار فصل و ویژگی‌هایشان",
                    "category": "شناخت طبیعت",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "تصاویر فصل‌ها, لباس‌های فصلی",
                    "instructions": "تصاویر هر فصل را نشان دهید → ویژگی‌های هر فصل را توضیح دهید → از کودک بپرسید الان چه فصلی است → با هم لباس مناسب فصل را انتخاب کنید",
                    "safety": ""
                  },
                  {
                    "title": "نمونه کاربرگ اعضای بدن پرندگان علوم پیش دبستانی",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-14.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-17.webp",
                    "desc": "کاربرگ اعضای بدن پرندگان آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن پرندگان به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن پرنده"
                  },
                  {
                    "title": "دانلود رایگان کاربرگ علوم شناخت اعضای صورت پیش دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-علوم-اعضای-صورت-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-علوم-اعضای-صورت-پیش-دبستان.webp",
                    "desc": "سلام قهرمان کوچک! آیا دوست داری با اجزای شگفت‌انگیز صورت خودت آشنا بشی؟ این کاربرگ علوم شناخت اعضای صورت پیش دبستان مخصوص شما طراحی شده تا ضمن بازی و سرگرمی،"
                  },
                  {
                    "title": "دانلود واحد کار علوم پیش دبستان شناخت حواس پنجگانه",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "ترتیب",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "ترتیب",
                "items": [
                  {
                    "title": "شناخت حیوانات",
                    "type": "activity",
                    "desc": "شناخت حیوانات اهلی و وحشی",
                    "category": "شناخت طبیعت",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "تصاویر حیوانات, عروسک حیوانات",
                    "instructions": "تصاویر حیوانات مختلف را نشان دهید → صدای هر حیوان را تقلید کنید → از کودک بخواهید نام حیوان را بگوید → محل زندگی هر حیوان را توضیح دهید",
                    "safety": ""
                  },
                  {
                    "title": "دانلود کاربرگ اعضای بدن جانوران علوم پیش دبستانی",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T233402.649.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T233343.458.webp",
                    "desc": "کاربرگ اعضای بدن جانوران آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن جانوران به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن جانور"
                  },
                  {
                    "title": "دانلود ۵ کاربرگ شناخت حیوانات اهلی و وحشی پیش دبستانی",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی-1.webp",
                    "desc": "این یک فایل آموزشی برای نوآموزان، شامل کاربرگ شناخت حیوانات اهلی و وحشی پیش دبستانی است. این مجموعه فعالیت‌ها با هدف آشنایی کودکان با دسته‌بندی حیوانات و"
                  },
                  {
                    "title": "دانلود رایگان کاربرگ علوم شناخت اعضای بدن پیش دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T000912.137.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T000858.935.webp",
                    "desc": "کاربرگ شناخت اعضای بدن پیش دبستان تمرکز خود را بر روی آشنایی دانش‌آموزان با اعضای مختلف بدن انسان گذاشته است و هدف آن تقویت مهارت شناسایی و نام‌گذاری بخش‌های"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "رنگ‌ها، حیوانات، فصل‌ها و طبیعت",
        "hotspots": [
          {
            "title": "رنگ‌ها",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "بیان احساسات",
                    "type": "activity",
                    "desc": "شناخت و بیان احساسات مختلف",
                    "category": "مهارت عاطفی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تصاویر چهره‌های مختلف",
                    "instructions": "تصاویر چهره‌های مختلف را نشان دهید → از کودک بخواهید احساس را نام ببرد → از او بپرسید کِی این احساس را دارد → با هم درباره احساسات صحبت کنید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ پیش‌دبستانی آشنایی با مشاغل (معلم)",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "دانلود کاربرگ واحدکار مشاغل پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "نمونه کاربرگ مشاغل (شغل معماری) پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "مسواک زدن",
                    "type": "activity",
                    "desc": "یادگیری مسواک زدن صحیح",
                    "category": "بهداشت شخصی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "مسواک, خمیر دندان",
                    "instructions": "خمیر دندان به اندازه نخود روی مسواک بگذارید → مسواک را با حرکت دایره‌ای حرکت دهید → سطح بیرونی، داخلی و جویدن دندان‌ها را تمیز کنید → دهان را بشویید",
                    "safety": "از مسواک نرم و خمیر دندان مناسب کودکان استفاده کنید"
                  },
                  {
                    "title": "ایده برای نقاشی بهداشت فردی برای پیش دبستانی",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T210317.076.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T210303.273.webp",
                    "desc": "در کاربرگ ایده برای نقاشی بهداشت فردی، تصویر کودکی که در حال شستن دست و صورت است همراه با یک گربه در کنار او و چند وسیله بهداشتی شامل دستگیره در، آب‌پاش،"
                  },
                  {
                    "title": "ایده برای نقاشی بهداشت فردی برای پیش دبستانی",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T202814.125.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T202752.798.webp",
                    "desc": "در کاربرگ ایده برای نقاشی بهداشت فردی، تصویر کودکی که در حال مسواک زدن است همراه با چند وسیله بهداشتی شامل صابون ، لیوان مخصوص و مسواک در اختیار دانش‌آموز"
                  },
                  {
                    "title": "واحدکار بهداشت (حمام کردن) پیش دبستان",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T203439.615.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T203422.389.webp",
                    "desc": "در کاربرگ واحدکار بهداشت (حمام کردن) پیش دبستان، تصویری از کودکی که در حال حمام است همراه با وسایل مختلف در اختیار دانش‌آموز قرار می‌گیرد. وسایل شامل حوله،"
                  }
                ]
              }
            ]
          },
          {
            "title": "حیوانات",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "حیوانات",
                "items": [
                  {
                    "title": "حل مسئله ساده",
                    "type": "activity",
                    "desc": "تقویت مهارت حل مسئله",
                    "category": "مهارت شناختی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "پازل, معماهای ساده",
                    "instructions": "مسئله‌ای ساده مطرح کنید → از کودک بخواهید فکر کند → راهنمایی کنید تا راه‌حل را پیدا کند → با هم راه‌حل را اجرا کنید",
                    "safety": ""
                  },
                  {
                    "title": "مجموعه کاربرگ های هوش بگرد و پیداکن پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحد کار جذاب هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-جذاب-هوش-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحدکار-جذاب-هوش-پیش-دبستان.webp",
                    "desc": "در این واحد کار جذاب هوش پیش دبستان، کودکان با فعالیت‌های دیداری، رنگ‌آمیزی، دقت و تمرکز، طبقه‌بندی و حل مسئله آشنا می‌شوند. تمرین‌ها به‌صورت بازی‌محور طراحی"
                  },
                  {
                    "title": "پیک تابستانه دقت و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-2.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-2.webp",
                    "desc": "پیک تابستانه دقت و تمرکز پیش دبستان:  این کاربرگ جذاب و رنگارنگ با هدف تقویت مهارت‌های دقت و تمرکز در کودکان پیش‌دبستانی طراحی شده است. فعالیت اصلی شامل وصل"
                  }
                ]
              }
            ]
          },
          {
            "title": "فصل‌ها",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "فصل‌ها",
                "items": [
                  {
                    "title": "لباس مناسب فصل",
                    "type": "activity",
                    "desc": "انتخاب لباس مناسب هر فصل",
                    "category": "مهارت زندگی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "تصاویر لباس‌های فصلی",
                    "instructions": "تصاویر لباس‌های مختلف را نشان دهید → از کودک بپرسید کدام برای تابستان است → درباره هر فصل توضیح دهید → با هم لباس مناسب را انتخاب کنید",
                    "safety": ""
                  },
                  {
                    "title": "نمونه کاربرگ واحدکار مشاغل (شغل نانوا) پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحدکار رایگان مشاغل (قاضی) پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحدکار مشاغل آشنایی با شغل خیاطی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T000253.252.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T000239.060.webp",
                    "desc": "کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی مناسب کودکان است تا با مشاهده، تحلیل و ارتباط دادن فعالیت‌ها با ابزارها و فرآیندهای شغلی، هم دانش عمومی خود را افزایش"
                  }
                ]
              }
            ]
          },
          {
            "title": "طبیعت",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "طبیعت",
                "items": [
                  {
                    "title": "شستن دست‌ها",
                    "type": "activity",
                    "desc": "یادگیری مراحل صحیح شستن دست",
                    "category": "بهداشت شخصی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "آب, صابون, دستمال",
                    "instructions": "دست‌ها را خیس کنید → صابون بزنید → ۲۰ ثانیه بمالید → آب بکشید و خشک کنید",
                    "safety": "دمای آب را کنترل کنید"
                  },
                  {
                    "title": "واحدکار بهداشت فردی برای پیش دبستان",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T203417.922.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T203400.129.webp",
                    "desc": "کاربرگ واحدکار بهداشت فردی درباره‌ی مراقبت‌های شخصی و بهداشت روزانه است."
                  },
                  {
                    "title": "کاربرگ آشنایی با بهداشت فردی پیش دبستانی",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ آشنایی با بهداشت فردی پیش دبستانی",
                    "type": "pdf",
                    "category": "بهداشت",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-آشنایی-با-بهداشت-فردی-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-آشنایی-با-بهداشت-فردی-پیش-دبستانی.webp",
                    "desc": "آموزش بهداشت فردی می‌تواند سرگرم‌کننده و جذاب باشد! این کاربرگ آشنایی با بهداشت فردی پیش دبستانی، کودکان دلبند شما را به دنیای پاکیزگی و سلامتی می‌برد. در این"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "bazi",
    "folder": "bazi",
    "name": "اتاق بازی",
    "icon": "🧸",
    "heroPos": {
      "left": {
        "x": 10,
        "y": 70
      },
      "center": {
        "x": 50,
        "y": 78
      },
      "right": {
        "x": 90,
        "y": 45
      }
    },
    "views": {
      "herog": {
        "label": "پازل، بلوک، خمیر و جورچین",
        "hotspots": [
          {
            "title": "پازل",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "لالایی و ترانه‌های حرکتی",
                    "type": "activity",
                    "desc": "تقویت زبان و هماهنگی حرکات",
                    "category": "بازی موسیقی",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 15,
                    "materials": "موبایل یا بلندگو",
                    "instructions": "ترانه‌ای مانند سر و شونه زانو پا پخش کنید → از کودک بخواهید حرکات را تقلید کند → با کودک همراهی کنید → ترانه‌های مختلف را امتحان کنید",
                    "safety": "صدا را در سطح مناسبی نگه دارید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "شمارش انگشتی",
                    "type": "activity",
                    "desc": "تقویت شناخت اعداد و مهارت ظریف",
                    "category": "بازی آموزشی",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "از کودک بخواهید انگشتان دست را بشمارد → با هم انگشتان را بشمارید → اعداد را با صدای بلند بگویید → تکرار کنید تا کودک آشنا شود",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ پیش دبستان آموزش حواس پنجگانه",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "آموزش سایه پیش دبستان",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ رایگان آموزش فصل پاییز برای پیش دبستانی",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T230715.674.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T230702.342.webp",
                    "desc": "کاربرگ آموزش فصل پاییز برای پیش دبستانی با طراحی ساده و مؤثر، درخت پاییزی را به شکلی نمایش می‌دهد که به راحتی برای کودکان قابل درک و رنگ‌آمیزی است. طرح کلی"
                  }
                ]
              }
            ]
          },
          {
            "title": "بلوک",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "جعبه جادویی",
                    "type": "activity",
                    "desc": "تقویت واژگان و حس لامسه",
                    "category": "بازی حسی",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "جعبه, اشیاء مختلف",
                    "instructions": "شیئی را داخل جعبه قرار دهید → از کودک بخواهید شیء را با لمس حدس بزند → بعد از حدس، شیء را نشان دهید → نام شیء را بگویید و تکرار کنید",
                    "safety": "از اشیاء امن و بدون لبه‌های تیز استفاده کنید"
                  },
                  {
                    "title": "آزمونک وصل کردن شکل ها دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "تمرین تابستانه دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "تمرین دست‌ورزی و تقویت مهارت‌های حرکتی پیش‌دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "بازی نام‌بردن",
                    "type": "activity",
                    "desc": "تقویت واژگان و درک زبانی",
                    "category": "بازی زبانی",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "اشیاء مختلف",
                    "instructions": "شیئی مانند سیب را نشان دهید → بپرسید سیب کجاست؟ → از کودک بخواهید به شیء اشاره کند → با تشویق پاسخ دهید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ آزمون فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IM55455454py.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sa54545py.webp",
                    "desc": "کاربرگ آزمون فارسی پیش دبستان با استفاده از تصاویر جذاب و کلمات ساده، به کودکان کمک می‌کنند تا ارتباط بین حروف و صداهای آغازین کلمات را درک کنند."
                  },
                  {
                    "title": "کاربرگ آشنایی با نشانه (ن) فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-نشانه-ن-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-نشانه-ن-پیش-دبستان.webp",
                    "desc": "بازی و یادگیری، بهترین ترکیب برای پرورش ذهن‌های کوچکه! کاربرگ آشنایی با نشانه (ن) فارسی پیش دبستان، راهی عالی برای آشنا کردن کودکان با صدای حرف «ن» هست. با"
                  },
                  {
                    "title": "کاربرگ آموزش چوب خط پیش دبستانی",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/آموزش-چوب-خط-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/آموزش-چوب-خط-پیش-دبستانی.webp",
                    "desc": "برای دانلود فایل PDF رایگان این کاربرگ آموزش چوب خط پیش دبستانی به انتهای همین صفحه مراجعه کنید."
                  }
                ]
              }
            ]
          },
          {
            "title": "خمیر",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "خمیر",
                "items": [
                  {
                    "title": "سطل و بیل",
                    "type": "activity",
                    "desc": "تقویت مهارت ظریف و بازی وانمودی",
                    "category": "بازی حسی",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 20,
                    "materials": "سطل, بیل کوچک, شن یا ماسه",
                    "instructions": "شن یا ماسه را در سطل بریزید → از کودک بخواهید با بیل شن را جابه‌جا کند → با هم قلعه بسازید → از خلاقیت کودک لذت ببرید",
                    "safety": "از شن تمیز و بدون مواد خطرناک استفاده کنید"
                  },
                  {
                    "title": "تمرین دست ورزی پیش دبستان ویژه تابستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تمرین-دست-ورزی-پیش-دبستان-ویژه-تابستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تمرین-دست-ورزی-پیش-دبستان-ویژه-تابستان.webp",
                    "desc": "آیا می‌دانستید که مهارت نوشتن، پیش از آنکه به مداد و کاغذ مربوط باشد، به قدرت عضلات کوچک دست فرزند شما بستگی دارد؟ دوره پیش‌دبستانی و به‌ویژه ایام تابستان،"
                  },
                  {
                    "title": "تمرین لوحه نویسی و دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی.webp",
                    "desc": "تمرین لوحه نویسی و دست ورزی پیش دبستان: این کاربرگ دوست‌داشتنی، کودکان را به دنیای پربار باران و طبیعت می‌برد و همزمان مهارت‌های دست‌ورزی آن‌ها را تقویت"
                  },
                  {
                    "title": "تکلیف دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-دست-ورزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-دست-ورزی-پیش-دبستان.webp",
                    "desc": "این تکلیف دست ورزی پیش دبستان یک تمرین جذاب و ساده برای تقویت مهارت‌های دست‌ورزی و هماهنگی چشم و دست در کودکان است. در این برگه، تصویر یک خرگوش کارتونی بامزه"
                  }
                ]
              }
            ]
          },
          {
            "title": "جورچین",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "جورچین",
                "items": [
                  {
                    "title": "آینه بازی",
                    "type": "activity",
                    "desc": "تقویت خودآگاهی و تقلید",
                    "category": "بازی اجتماعی",
                    "ageMin": 1,
                    "ageMax": 2,
                    "duration": 10,
                    "materials": "آینه",
                    "instructions": "جلوی آینه بایستید → ادای چهره‌های مختلف (خنده، تعجب) کنید → از کودک بخواهید چهره‌ها را تقلید کند → با هم بازی کنید",
                    "safety": "از آینه‌های شکست‌نی و امن استفاده کنید"
                  },
                  {
                    "title": "کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T221323.264.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T221257.781.webp",
                    "desc": "در کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی تصویری از یک خانم در حال خیاطی کردن ارائه شده که کودکان را به مشاهده جزئیات و درک فعالیت فرد مشغول در تصویر دعوت"
                  },
                  {
                    "title": "واحدکار مشاغل (نجاری) پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-9-2.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-30-2.webp",
                    "desc": "کاربرگ واحدکار مشاغل (نجاری) پیش دبستانی، یک نجار را در حال ساخت یا برش چوب با دقت و مهارت نشان می‌دهد."
                  },
                  {
                    "title": "واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-36.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-7-1.webp",
                    "desc": "سفری شگفت‌انگیز از دانه تا نان! این واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی ، مراحل کامل و حیاتی تهیه نان، این نعمت الهی را به شکلی ساده و آموزنده به"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "توپ، دویدن، سُرخوردن و رقص",
        "hotspots": [
          {
            "title": "توپ",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "دالی موشه",
                    "type": "activity",
                    "desc": "تقویت پایداری شیء و تعامل اجتماعی",
                    "category": "بازی اجتماعی",
                    "ageMin": 1,
                    "ageMax": 2,
                    "duration": 10,
                    "materials": "دست, پارچه",
                    "instructions": "پشت دست یا پارچه قایم شوید → بگویید دالی! و ناگهان ظاهر شوید → با کودک خنده و تعامل کنید → تکرار کنید تا کودک علاقه نشان دهد",
                    "safety": "از پارچه نرم و تمیز استفاده کنید"
                  },
                  {
                    "title": "واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحد کار مشاغل پیش دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ آشنایی با مشاغل (نقاش) پیش‌دبستانی",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "توپ غلطان",
                    "type": "activity",
                    "desc": "تقویت هماهنگی دست-چشم و دنبال کردن چشم",
                    "category": "بازی حرکتی",
                    "ageMin": 1,
                    "ageMax": 2,
                    "duration": 10,
                    "materials": "توپ نرم",
                    "instructions": "توپ را روی زمین به سمت کودک غلت دهید → از کودک بخواهید توپ را بگیرد → تکرار کنید و توپ را به سمت‌های مختلف بفرستید → با کودک بازی کنید",
                    "safety": "از توپ‌های نرم و سبک استفاده کنید"
                  },
                  {
                    "title": "کاربرگ واحد کار ورزش پیش‌دبستان",
                    "type": "pdf",
                    "category": "ورزش و حرکتی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "دویدن",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "پازل اشکال ساده",
                    "type": "game",
                    "desc": "شناخت شکل‌ها و هماهنگی دست-چشم",
                    "category": "بازی فکری",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 15,
                    "materials": "جعبه پازل چوبی, اشکال مثلث/مربع/دایره",
                    "instructions": "اشکال را به کودک نشان دهید → از کودک بخواهید شکل را در سوراخ متناظر قرار دهد → در صورت اشتباه، راهنمایی کنید → با موفقیت، تشویق کنید",
                    "safety": "از پازل‌های بزرگ و بدون لبه‌های تیز استفاده کنید",
                    "game": "shape-sorter"
                  },
                  {
                    "title": "کاربرگ اختلاف یابی و هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ استاندارد هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-استاندارد-هوش-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-استاندارد-هوش-پیش-دبستان.webp",
                    "desc": "کاربرگ استاندارد هوش پیش دبستان یک ابزار آموزشی هدفمند برای تقویت مهارت‌های شناختی کودکان ۴ تا ۶ سال است. این کاربرگ با تمرین‌هایی مانند تشخیص تفاوت‌ها،"
                  },
                  {
                    "title": "کاربرگ تابستانه تمرین دقت و تمرکز پیش‌ دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-تمرین-دقت-و-تمرکز-پیش‌-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-تمرین-دقت-و-تمرکز-پیش‌-دبستان.webp",
                    "desc": "این کاربرگ تابستانه تمرین دقت و تمرکز پیش‌ دبستان که توسط تیم آموزشی دکتر سمیه روحی طراحی شده، با هدف تقویت هماهنگی چشم و دست و درک فضایی کودکان ۴ تا ۶ سال"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "مربا/خمیربازی",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و مهارت دستوری",
                    "category": "بازی خلاقانه",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 25,
                    "materials": "خمیر بازی, قالب, وردنه کوچک",
                    "instructions": "خمیر را به کودک بدهید → از کودک بخواهید با خمیر شکل بسازد → با قالب‌ها به کودک کمک کنید → شکل‌ها را با هم تماشا کنید",
                    "safety": "از خمیر غیرسمی و مناسب کودکان استفاده کنید"
                  },
                  {
                    "title": "کاربرگ تابستانه هوش مرور پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-2.webp",
                    "desc": "کاربرگ تابستانه هوش مرور پیش دبستان:  این کاربرگ یک فعالیت سرگرم‌کننده و آموزشی برای دانش‌آموزان دبستانی است که به صورت تعاملی و تصویری مهارت‌های مختلفی را"
                  },
                  {
                    "title": "کاربرگ تشخیص اختلاف (هوش)پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-17.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-39.webp",
                    "desc": "کاربرگ تشخیص اختلاف (هوش) پیش دبستان یک فعالیت سرگرم‌کننده و آموزشی برای کودکان است که به تقویت دقت و تمرکز آن‌ها کمک می‌کند."
                  },
                  {
                    "title": "2 کاربرگ تشخیص تفاوت برای تقویت هوش",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تشخیص-تفاوت.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تشخیص-تفاوت.webp",
                    "desc": "کاربرگ تشخیص تفاوت تصاویر، ابزاری طلایی برای پرورش مهارت‌های شناختی فرزندان شماست. دانلود رایگان فایل pdf"
                  }
                ]
              }
            ]
          },
          {
            "title": "سُرخوردن",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "سُرخوردن",
                "items": [
                  {
                    "title": "بلوک چینی",
                    "type": "activity",
                    "desc": "تقویت مهارت ظریف و مفهوم بالا/پایین",
                    "category": "بازی حرکتی",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 20,
                    "materials": "بلوک‌های چوبی یا پلاستیکی",
                    "instructions": "بلوک‌ها را روی هم بچینید → از کودک بخواهید بلوک‌ها را روی هم قرار دهد → در صورت ریختن، با خنده واکنش نشان دهید → تکرار کنید تا برج بلندتر شود",
                    "safety": "از بلوک‌های سبک و بدون لبه‌های تیز استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "رقص",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "رقص",
                "items": [
                  {
                    "title": "قایم موشک",
                    "type": "activity",
                    "desc": "تقویت پایداری شیء و صبر",
                    "category": "بازی حرکتی",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "مبلمان یا فضای پنهان",
                    "instructions": "پشت مبلمان یا در پنهان شوید → از کودک بخواهید چشم‌هایش را ببندد و بشمارد → بعد از شمارش، خود را نشان دهید → نوبت کودک برای قایم شدن",
                    "safety": "از فضاهای امن و بدون خطر استفاده کنید"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "نقاشی، عروسک، موسیقی و ساختنی",
        "hotspots": [
          {
            "title": "نقاشی",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "جورچین دستهدار",
                    "type": "activity",
                    "desc": "تقویت شناخت و حل مسئله",
                    "category": "بازی فکری",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 15,
                    "materials": "پازل چوبی با دستگیره",
                    "instructions": "پازل را به کودک نشان دهید → از کودک بخواهید قطعات را در جای خود قرار دهد → در صورت نیاز کمک کنید → با موفقیت تشویق کنید",
                    "safety": "از پازل‌های بزرگ و امن استفاده کنید"
                  },
                  {
                    "title": "کاربرگ تقویت حافظه دیداری پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_4241-copy.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/ااd-2-copy-2.webp",
                    "desc": "کاربرگ تقویت حافظه دیداری ک ابزار عالی برای تقویت حافظه دیداری و هماهنگی چشم و دست در کودکان پیش‌دبستانی است."
                  },
                  {
                    "title": "کاربرگ تقویت دقت و تمرکز کودکانه",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5518-copy.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/saopy.webp",
                    "desc": "کاربرگ تقویت دقت و تمرکز کودکانه برای پیش دبستانی های عزیز طراحی شده است."
                  },
                  {
                    "title": "کاربرگ تقویت هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5603.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-12.webp",
                    "desc": "تقویت هوش کودکان پیش‌دبستانی فواید فراوانی برای رشد و توسعه آنها دارد. یکی از اصلی‌ترین مزایا، افزایش توانایی حل مسئله و تفکر انتقادی است که در آینده به کودک"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "پازل ۴-۸ تکه",
                    "type": "game",
                    "desc": "تقویت شناخت و حل مسئله",
                    "category": "بازی فکری",
                    "ageMin": 3,
                    "ageMax": 4,
                    "duration": 20,
                    "materials": "پازل تصویری",
                    "instructions": "پازل را به کودک نشان دهید → از کودک بخواهید قطعات را سر هم کند → در صورت نیاز راهنمایی کنید → با موفقیت تشویق کنید",
                    "safety": "از پازل‌های مناسب سن استفاده کنید",
                    "game": "puzzle"
                  },
                  {
                    "title": "کاربرگ تقویت هوش و تمرکز پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ تمرکز و دقت و هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-2.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-2.webp",
                    "desc": "کاربرگ تمرکز و دقت و هوش پیش دبستان: خرگوش کوچولوی ما خیلی گرسنه‌ است و هوس هویج کرده! اما مسیر رسیدن به سبد هویج پر از پیچ و خم و راه پر پیچ و خم است. با کمک"
                  },
                  {
                    "title": "کاربرگ حافظه بینایی پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "عروسک",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "حرکت حیوانات",
                    "type": "activity",
                    "desc": "تقویت تخیل و هماهنگی حرکات",
                    "category": "بازی حرکتی",
                    "ageMin": 2,
                    "ageMax": 3,
                    "duration": 15,
                    "materials": "",
                    "instructions": "بگویید مثل خرگوش بپر → مثل خرس راه برو → از کودک بخواهید حرکات را تقلید کند → با هم بازی کنید",
                    "safety": "از فضای امن برای پرش استفاده کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "الگو و دنباله",
                    "type": "game",
                    "desc": "تقویت شناخت و آمادگی ریاضی",
                    "category": "بازی آموزشی",
                    "ageMin": 3,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "مهره‌های رنگی",
                    "instructions": "دنباله‌ای مانند قرمز-آبی-قرمز بسازید → از کودک بخواهید دنباله را ادامه دهد → با مهره‌های مختلف تمرین کنید → سطح دشواری را تدریجاً افزایش دهید",
                    "safety": "از مهره‌های بزرگ استفاده کنید",
                    "game": "pattern"
                  },
                  {
                    "title": "ایده نقاشی دانشمند برای پیش دبستان",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-17-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-39.webp",
                    "desc": "کاربرگ نقاشی دانشمند برای پیش دبستان، نقاشی درباره‌ی یک دانشمند است."
                  },
                  {
                    "title": "برگه املا و نقاشی اتوبوسی دبستان",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/برگه-املا-و-نقاشی-اتوبوسی-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/برگه-املا-و-نقاشی-اتوبوسی-دبستان.webp",
                    "desc": "برگه املا و نقاشی اتوبوسی دبستان یک فعالیت جذاب و خلاقانه برای تلفیق یادگیری و سرگرمی است. در این برگه، دانش‌آموزان با نوشتن کلمات یا جملات املایی داخل"
                  },
                  {
                    "title": "ترتیب لوحه نویسی پیش دبستانی",
                    "type": "pdf",
                    "category": "کاربرگ پیش‌دبستانی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "موسیقی",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "خداحافظی و سلام",
                    "type": "activity",
                    "desc": "تقویت عاطفی-اجتماعی و امنیت",
                    "category": "بازی اجتماعی",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 5,
                    "materials": "",
                    "instructions": "در ابتدای جلسه سلام کنید → در پایان جلسه خداحافظی کنید → از حرکات دست تکان دادن استفاده کنید → آهنگی برای سلام و خداحافظی پخش کنید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ انواع مشاغل پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ رایگان آشنایی با مشاغل (تعمیرکار)",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ رایگان نقاشی مشاغل پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T014131.145.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T014117.184.webp",
                    "desc": "کاربرگ رایگان نقاشی مشاغل صحنه‌ای را نشان می‌دهد که یک کودک در دست خود شانه و قیچی دارد و مشغول آرایشگری است. تصویر به دانش‌آموز کمک می‌کند تا با فعالیت‌های"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "بازی حافظه",
                    "type": "game",
                    "desc": "تقویت حافظه کاری و توجه",
                    "category": "بازی فکری",
                    "ageMin": 3,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "کارت‌های جور شده",
                    "instructions": "کارت‌ها را رو به پایین بچینید → از کودک بخواهید کارت‌ها را جفت کند → با صداهای تشویقی همراهی کنید → تعداد کارت‌ها را تدریجاً افزایش دهید",
                    "safety": "از کارت‌های بزرگ و امن استفاده کنید",
                    "game": "memory-match"
                  },
                  {
                    "title": "کاربرگ خلاق «هوش پیش‌دبستان»",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-خلاق-هوش-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-خلاق-هوش-پیش-دبستان.webp",
                    "desc": "کاربرگ خلاق «هوش پیش‌دبستان» با فعالیت‌های جذاب رنگ‌آمیزی، شمارش، تشخیص الگو و دقت دیداری طراحی شده تا کودکان در قالب بازی و سرگرمی، مهارت‌های ذهنی خود را"
                  },
                  {
                    "title": "کاربرگ دقت و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-6.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-6.webp",
                    "desc": "کاربرگ دقت و تمرکز پیش دبستان:این یک کاربرگ آموزشی برای کودکان پیش‌دبستانی یا ابتدایی است که با هدف آموزش مفاهیم &quot;بلند&quot; و &quot;کوتاه&quot; طراحی شده است. در قسمت اصلی"
                  },
                  {
                    "title": "کاربرگ دقت و تمرکز پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-6.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-7.jpg",
                    "desc": "کاربرگ دقت و تمرکز پیش دبستانی به صورت خلاقانه با موضوع “تفاوت‌یابی در تصاویر”، تمرینی ویژه برای تقویت دقت و تمرکز کودکان دبستانی طراحی شده است. در این صفحه،"
                  }
                ]
              }
            ]
          },
          {
            "title": "ساختنی",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "سیمون می‌گه",
                    "type": "activity",
                    "desc": "تقویت توجه و پیروی از دستور",
                    "category": "بازی گروهی",
                    "ageMin": 3,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "",
                    "instructions": "بگویید سیمون می‌گه دست بزن → کودک باید دستور را اجرا کند → اگر بدون سیمون می‌گه دستور دادید، کودک نباید اجرا کند → با چند کودک بازی کنید",
                    "safety": "از دستورهای امن استفاده کنید"
                  },
                  {
                    "title": "کاربرگ رایگان واحدکار مشاغل پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T111018.517.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T110957.210.webp",
                    "desc": "در کاربرگ رایگان واحدکار مشاغل، چند شغل مختلف در یک سمت صفحه نمایش داده شده‌اند و در مقابل آن‌ها ابزارها یا نشانه‌هایی قرار دارد که به وظایف هر شغل مربوط"
                  },
                  {
                    "title": "کاربرگ مشاغل (چشم پزشک) پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-3-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-24-1.webp",
                    "desc": "در کاربرگ مشاغل (چشم پزشک) از دانش‌آموز خواسته می‌شود که تصویر مربوط به شغل چشم پزشک را با دقت مشاهده کرده و تمامی بخش‌های آن را رنگ‌آمیزی کند."
                  },
                  {
                    "title": "نمونه کاربرگ معرفی مشاغل پیش دبستان",
                    "type": "pdf",
                    "category": "شناخت اجتماعی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5431.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5432.jpg",
                    "desc": "در کاربرگ معرفی مشاغل پیش دبستان، تصاویری از افراد مختلف در لباس‌های کاری و با ظاهر شغل‌های گوناگون مانند غواص، نقاش، رهبر ارکستر، پزشک و تاجر به نمایش درآمده است."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "حدس صدا",
                    "type": "game",
                    "desc": "تقویت شنوایی و شناخت",
                    "category": "بازی حسی",
                    "ageMin": 3,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "اشیاء با صداهای مختلف",
                    "instructions": "صدای حیوان یا وسیله‌ای را پخش کنید → از کودک بخواهید حدس بزند چیست → از بین تصاویر انتخاب کند → با تشویق پاسخ دهید",
                    "safety": "صدا را در سطح مناسبی نگه دارید",
                    "game": "sound-guess"
                  },
                  {
                    "title": "دانلود رایگان دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-دست-ورزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-دست-ورزی-پیش-دبستان.webp",
                    "desc": "دانلود رایگان دست ورزی پیش دبستان:  یه کاربرگ میوه‌ای جذاب و خوشمزه برای کوچولوهاتون آماده کردیم! با این کاربرگ، بچه‌ها می‌تونن با خطوط نقطه‌چین و شکل‌های"
                  },
                  {
                    "title": "دانلود رایگان دست ورزی کار با قیچی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "دانلود نمونه کاربرگ دست ورزی پیش دبستانی | رایگان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "honar",
    "folder": "honar",
    "name": "اتاق هنر و موسیقی",
    "icon": "🎨",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 55
      },
      "center": {
        "x": 45,
        "y": 60
      },
      "right": {
        "x": 85,
        "y": 45
      }
    },
    "views": {
      "herog": {
        "label": "برش، اوریگامی، کولاژ و نخی",
        "hotspots": [
          {
            "title": "برش",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "تاج مقوایی",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و خوداتکایی",
                    "category": "کاردستی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "مقوا, برچسب, چسب, پولک",
                    "instructions": "تاج را روی مقوا بکشید → برش دهید → تزیین کنید → سر بگذارید",
                    "safety": "از قیچی امن استفاده کنید"
                  },
                  {
                    "title": "قصه‌گویی با عروسک دستی",
                    "type": "activity",
                    "desc": "تقویت زبان و تخیل",
                    "category": "نمایش",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "عروسک دستی",
                    "instructions": "عروسک را انتخاب کنید → قصه‌ای بسازید → با عروسک اجرا کنید → کودک را در قصه شرکت دهید",
                    "safety": ""
                  },
                  {
                    "title": "دانلود کاربرگ تقویت دست ورزی | PDF رایگان و قابل چاپ",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "دانلود کاربرگ دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-دست-ورزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-دست-ورزی-پیش-دبستان.webp",
                    "desc": "کاربرگ دست ورزی پیش دبستان، دروازه‌ای به سوی خط زیبا و خواناست! در این کاربرگ، فرصتی طلایی برای فرزند کوشای شما فراهم شده تا با تمرین‌های هدفمند، مهارت‌های"
                  },
                  {
                    "title": "دست ورزی با قیچی پیش دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دست-ورزی-با-قیچی-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دست-ورزی-با-قیچی-پیش-دبستانی.webp",
                    "desc": "با این کاربرگ می توانید دست ورزی با قیچی را به پیش دبستانی ها آموزش دهید."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "بازی نقش (دکتر/فروشنده)",
                    "type": "activity",
                    "desc": "تقویت تخیل و مهارت‌های اجتماعی",
                    "category": "نمایش",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "اسباب‌بازی, لباس‌های وانمودی",
                    "instructions": "نقش‌ها را انتخاب کنید → فضا را آماده کنید → بازی را شروع کنید → با هم تعامل کنید",
                    "safety": "از اسباب‌بازی‌های امن استفاده کنید"
                  },
                  {
                    "title": "نمایش خلاق — داستان‌سازی با عروسک سایه",
                    "type": "activity",
                    "desc": "تقویت تخیل، مهارت راوی، کار گروهی و شناخت نور/سایه",
                    "category": "نمایش خلاق",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "پرده سفید، چراغ قوه، کاغذ، قیچی، چوب بستنی",
                    "instructions": "شخصیت‌های قصه را روی کاغذ بکشید و برش دهید → شخصیت‌ها را روی چوب بستنی بچسبانید (عروسک سایه) → پرده را بین دو صندلی بکشید و چراغ قوه پشت آن بگذارید → کودکان به نوبت داستان را با سایه‌بازی اجرا کنند",
                    "safety": "از چراغ قوه با نور مستقیم به چشم نگاه نکنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "اوریگامی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "آویز رولی دستمال‌کاغذی",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و بازیافت مواد",
                    "category": "کاردستی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "رول دستمال‌کاغذی, رنگ, چشمعروسک, کاموا",
                    "instructions": "رول را رنگ کنید → چشمعروسک بچسبانید → کاموا آویزان کنید → آویز بسازید",
                    "safety": ""
                  },
                  {
                    "title": "سایه‌بازی",
                    "type": "activity",
                    "desc": "تقویت تخیل و شناخت حیوانات",
                    "category": "نمایش",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "چراغقوه, دست, دیوار",
                    "instructions": "چراغقوه را روشن کنید → با دست سایه حیوانات بسازید → از کودک بخواهید حدس بزند → با هم بازی کنید",
                    "safety": "از چراغقوه امن استفاده کنید"
                  },
                  {
                    "title": "کاربرگ آموزشی دست ورزی ماز پیش دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/08_52_52-PM.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-7.webp",
                    "desc": "کاربرگ آموزشی دست ورزی ماز پیش دبستانی با تصویر یک توله سگ کارتونی و دوست‌داشتنی در بالای صفحه، بلافاصله توجه کودکان را به خود جلب می‌کند."
                  },
                  {
                    "title": "دست ورزی مقدمات نوشتن پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دست-ورزی-مقدماتی-نوشتن-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دست-ورزی-مقدماتی-نوشتن-پیش-دبستان.webp",
                    "desc": "این فایل یک تمرین دست ورزی مقدمات نوشتن پیش دبستان است که برای کودکان طراحی شده است. هدف از این تمرین، تقویت هماهنگی چشم و دست، کنترل حرکات ظریف انگشتان و"
                  },
                  {
                    "title": "دست ورزی و نقطه چین پیش دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-54.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-58.webp",
                    "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آموزش بلز (Orff) — ریتم و حرکات",
                    "type": "activity",
                    "desc": "تقویت حس ریتم، هماهنگی حرکتی-موسیقی و شناخت سازهای ساده",
                    "category": "موسیقی بلز",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "طبل، ماراتاک، چوب‌ریز، س سازهای ردیف بلز",
                    "instructions": "ریتم ساده را با دستان بزنید و کودک تقلید کند → ماراتاک را پخش کنید و کودک با حرکت همراهی کند → ساز را به کودک بدهید و از او بخواهید صدای زمزمه/قوی را تشخیص دهد → به صورت گروهی، یک قطعه ساده بلز اجرا کنید",
                    "safety": "سازها باید برای سن کودک مناسب و بدون لبه تیز باشند"
                  }
                ]
              }
            ]
          },
          {
            "title": "کولاژ",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "خمیر بازی خانگی",
                    "type": "activity",
                    "desc": "تقویت حس لامسه و خلاقیت",
                    "category": "کاردستی",
                    "ageMin": 1,
                    "ageMax": 5,
                    "duration": 30,
                    "materials": "آرد, نمک, آب, روغن, رنگ خوراکی",
                    "instructions": "مواد را مخلوط کنید → خمیر دربیاورید → با خمیر شکل بسازید → خشک کنید",
                    "safety": "از مواد خوراکی و غیرسمی استفاده کنید"
                  },
                  {
                    "title": "نمایش شلغم",
                    "type": "activity",
                    "desc": "تقویت همکاری و زبان",
                    "category": "نمایش",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "",
                    "instructions": "قصه شلغم را بخوانید → نقش‌ها را بین کودکان تقسیم کنید → نمایش را اجرا کنید → با هم لذت ببرید",
                    "safety": ""
                  },
                  {
                    "title": "فعالیت دست‌ورزی پیش‌دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/فعالیت-دست‌ورزی-پیش‌دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/فعالیت-دست‌ورزی-پیش‌دبستانی.webp",
                    "desc": "این تصویر یک فعالیت دست‌ورزی پیش‌دبستانی است که با هدف تقویت مهارت دست‌ورزی، هماهنگی چشم و دست، و آمادگی برای نوشتن طراحی شده است. در این فعالیت، کودک باید"
                  },
                  {
                    "title": "کاربرگ لوحه نویسی دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "مجموعه کاربرگ های کار با قیچی و دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/مجموعه-کاربرگ-های-کار-با-قیچی-و-دست-ورزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/مجموعه-کاربرگ-های-کار-با-قیچی-و-دست-ورزی-پیش-دبستان.webp",
                    "desc": "اگر به دنبال یک مجموعه کاربردی و جذاب برای تقویت مهارت‌های حرکتی ظریف کودک هستید، مجموعه کاربرگ های کار با قیچی و دست ورزی پیش دبستان می‌تواند یک انتخاب عالی"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آموزش بلز — صدای طبیعت با ساز",
                    "type": "activity",
                    "desc": "تقویت شنوایی، تقلید صدا و خلاقیت موسیقی",
                    "category": "موسیقی بلز",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "طبل میری، Xuân (xylophone)، озین (rain stick)",
                    "instructions": "صدای باران، باد، رعد و برق را با سازها تقلید کنید → کودک را تشویق کنید صدای حیوانات را با ساز بسازد → یک داستان کوتاه بسازید و کودکان افکت‌های صوتی را با ساز بسازند → آهنگ ساده بلز «باران بارونه» را با سازهای ردیف اجرا کنید",
                    "safety": "زنтар و ملته را در دسترس کودکان نگذارید"
                  }
                ]
              }
            ]
          },
          {
            "title": "نخی",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "مهره‌های گردن‌آویز ماکارونی",
                    "type": "activity",
                    "desc": "تقویت مهارت ظریف و شناخت رنگ‌ها",
                    "category": "کاردستی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "ماکارونی, نخ, رنگ خوراکی",
                    "instructions": "ماکارونی را رنگ کنید → نخ را از ماکارونی رد کنید → گردن‌آویز بسازید → بپوشید",
                    "safety": "از نخ کوتاه و امن استفاده کنید"
                  },
                  {
                    "title": "قصه‌سازی مشارکتی",
                    "type": "activity",
                    "desc": "تقویت زبان و خلاقیت",
                    "category": "نمایش",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "",
                    "instructions": "یک جمله شروع کنید → از کودک بخواهید جمله بعدی را بگوید → قصه را ادامه دهید → در پایان قصه را بخوانید",
                    "safety": ""
                  },
                  {
                    "title": "نمونه کاربرگ دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5327.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5328.jpg",
                    "desc": "نمونه کاربرگ دست ورزی یک نقاشی زنده است که کودکان را به سوی دنیای شگرف هنر و رنگ‌آمیزی فرا می‌خواند."
                  },
                  {
                    "title": "نمونه کار دست ورزی پیش دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ آموزشی دست ورزی پیش دبستانی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آموزش بلز — آواز و شعر با حرکات",
                    "type": "activity",
                    "desc": "ترکیب آواز، شعر، حرکات و ریتم (Speech-Rhythm-Movement)",
                    "category": "موسیقی بلز",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "شعرهای کودکانه فارسی، طبل",
                    "instructions": "شعر را با ریتم ساده بخوانید (تا-تی-تی-تا) → هر بند شعر را با یک حرکت بدن ترکیب کنید → کودک را تشویق کنید شعر را با حرکات اجرا کند → در گروه، شعر را به صورت Kanon (ドン) اجرا کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "انگشتی، اسفنجی، رنگ‌آمیزی و ترکیب رنگ",
        "hotspots": [
          {
            "title": "انگشتی",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "سر و شونه زانو پا",
                    "type": "activity",
                    "desc": "تقویت هماهنگی حرکات و شناخت اعضای بدن",
                    "category": "موسیقی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → با کودک حرکات را انجام دهید → به اعضای بدن اشاره کنید → سرعت را تدریجاً افزایش دهید",
                    "safety": "از فضای کافی برای حرکت استفاده کنید"
                  },
                  {
                    "title": "اتل متل توتوله",
                    "type": "activity",
                    "desc": "تقویت زبان و همکاری گروهی",
                    "category": "موسیقی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "در دایره بنشینید → شعر را بخوانید و دست‌ها را حرکت دهید → از کودک بخواهید گزینه‌ها را انتخاب کند → با هم ادامه دهید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "پنج تا مرغابی",
                    "type": "activity",
                    "desc": "تقویت شمارش و زبان",
                    "category": "موسیقی",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → مرغابی‌ها را با انگشتان نشان دهید → از کودک بخواهید بشمارد → با هم ادامه دهید",
                    "safety": ""
                  },
                  {
                    "title": "عروسک دستی کاغذی",
                    "type": "activity",
                    "desc": "تقویت مهارت دستوری و تخیل",
                    "category": "کاردستی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "کاغذ, چوب بستنی, چسب, مدادرنگی",
                    "instructions": "عروسک را روی کاغذ بکشید → برش دهید → به چوب بچسبانید → نمایش اجرا کنید",
                    "safety": "از قیچی امن و تحت نظارت استفاده کنید"
                  },
                  {
                    "title": "کاربرگ نقطه چین و دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-5.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-5.webp",
                    "desc": "کاربرگ نقطه چین و دست ورزی پیش دبستان:این کاربرگ آموزشی فارسی برای دانش‌آموزان پایه دوم دبستان طراحی شده است .هدف از این کاربرگ، تقویت مهارت‌های گوناگون"
                  },
                  {
                    "title": "کاربرگ آموزش دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ آموزش مهارت دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-3.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-3.webp",
                    "desc": "کاربرگ آموزش مهارت دست ورزی پیش دبستان: کودکان هنرمند و توانا، آماده‌اید تا با مدادهای جادویی خود، یک پرنده‌ی زیبا و دوست‌داشتنی را کامل کنید؟ در این کاربرگ"
                  }
                ]
              }
            ]
          },
          {
            "title": "اسفنجی",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "آهویی دارم خوشگله",
                    "type": "activity",
                    "desc": "تقویت تخیل و حرکات نرم",
                    "category": "موسیقی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → حرکات آهوی نرم را انجام دهید → از کودک بخواهید همراهی کند → با هم بپرید",
                    "safety": ""
                  },
                  {
                    "title": "خورشید خانوم",
                    "type": "activity",
                    "desc": "تقویت شناخت طبیعت",
                    "category": "موسیقی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → به پنجره اشاره کنید → از کودک بخواهید خورشید را نشان دهد → با هم صبح بخیر بگویید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "عروسک جورابی",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و مهارت دستوری",
                    "category": "کاردستی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "جوراب کهنه, دکمه, نخ, چسب, پنبه",
                    "instructions": "جوراب را پر کنید → چشم‌ها را بچسبانید → دهان را بدوزید → عروسک را کامل کنید",
                    "safety": "از مواد امن و غیرسمی استفاده کنید"
                  },
                  {
                    "title": "کاربرگ تابستانه دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-39.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-23.webp",
                    "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."
                  },
                  {
                    "title": "کاربرگ دست ورزی برای پیش دبستانی | دانلود رایگان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه.webp",
                    "desc": "کاربرگ دست ورزی برای پیش دبستانی یک ابزار آموزشی و تمرینی برای دانش‌آموزان دوره پیش‌دبستان و دبستان است که بر تقویت مهارت‌های دست‌ورزی و پیش‌نیازهای لازم برای نوشتن تمرکز دارد."
                  },
                  {
                    "title": "کاربرگ تابستانه ویژه دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-ویژه-دست-ورزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-ویژه-دست-ورزی-پیش-دبستان.webp",
                    "desc": "این کاربرگ تابستانه ویژه دست ورزی پیش دبستان  یک فعالیت آموزشی جذاب و دوست‌داشتنی برای کودکان است که با هدف تقویت مهارت‌های پایه‌ای در سنین پایین طراحی شده"
                  }
                ]
              }
            ]
          },
          {
            "title": "رنگ‌آمیزی",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "بارون بارونه",
                    "type": "activity",
                    "desc": "تقویت شنوایی و تقلید صدا",
                    "category": "موسیقی",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → صدای باران را با انگشتان روی میز تقلید کنید → از کودک بخواهید همراهی کند → با هم لذت ببرید",
                    "safety": ""
                  },
                  {
                    "title": "بچرخ و بچرخ",
                    "type": "activity",
                    "desc": "تقویت تعادل و حرکات چرخشی",
                    "category": "موسیقی",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 10,
                    "materials": "",
                    "instructions": "آهنگ را پخش کنید → با کودک بچرخید → از کودک بخواهید تعادل خود را حفظ کند → با احتیاط انجام دهید",
                    "safety": "در فضای باز و امن انجام دهید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "قایق پوست گردو",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و علم ساده",
                    "category": "کاردستی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "پوست گردو, خلال دندان, کاغذ, چسب",
                    "instructions": "پوست گردو را آماده کنید → بادبان را بسازید → قایق را سر هم کنید → در آب آزمایش کنید",
                    "safety": "از چسب غیرسمی استفاده کنید"
                  },
                  {
                    "title": "دانلود رایگان کاربرگ تقویت دست ورزی | PDF قابل چاپ",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-تقویت-دست-ورزی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-تقویت-دست-ورزی.webp",
                    "desc": "کاربرگ تقویت دست ورزی برای کودکان پیش‌دبستانی و کلاس اول ابتدایی. کمک به تقویت مهارت‌های حرکتی، هماهنگی چشم و دست و افزایش دقت و تمرکز. دانلود رایگان PDF قابل چاپ ویژه معلمان و والدین."
                  },
                  {
                    "title": "کاربرگ تمرینی ماز (دست ورزی)",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-1.webp",
                    "desc": "کاربرگ تمرینی ماز (دست ورزی):  آیا آماده‌اید تا در یک ماجراجویی پرپیچ‌وخم به موش کوچولو کمک کنید؟ این کاربرگ جذاب، یک هزارتوی هیجان‌انگیز است که قدرت تمرکز و"
                  },
                  {
                    "title": "کاربرگ تمرین دست ورزی باقیچی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-تمرین-دست-ورزی-باقیچی-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-تمرین-دستورزی-باقیچی-پیش-دبستان.jpg",
                    "desc": "این کاربرگ تمرین دست ورزی باقیچی پیش دبستان، طراحی شده برای کودکان باهوش شما، به منظور تقویت مهارت‌های دستی، هماهنگی چشم و دست و تمرکز است. با استفاده از"
                  }
                ]
              }
            ]
          },
          {
            "title": "ترکیب رنگ",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "عروسک خوشگله من",
                    "type": "activity",
                    "desc": "تقویت عاطفی و حرکات ملایم",
                    "category": "موسیقی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 10,
                    "materials": "عروسک",
                    "instructions": "آهنگ را پخش کنید → عروسک را تکان دهید → از کودک بخواهید عروسک را بغل کند → با هم رقص ملایم انجام دهید",
                    "safety": "از عروسک‌های نرم و امن استفاده کنید"
                  },
                  {
                    "title": "دست میزنیم، پا میکوبیم",
                    "type": "activity",
                    "desc": "تقویت ریتم و هماهنگی",
                    "category": "موسیقی",
                    "ageMin": 1,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "ریتم را با دست بزنید → با پا میکوبید → از کودک بخواهید همراهی کند → با هم ادامه دهید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "نقاشی با انگشت",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و حس لامسه",
                    "category": "کاردستی",
                    "ageMin": 1,
                    "ageMax": 4,
                    "duration": 20,
                    "materials": "رنگ خوراکی, کاغذ بزرگ",
                    "instructions": "رنگ را روی کاغذ بگذارید → از کودک بخواهید با انگشت نقاشی کند → با هم خلاقیت به خرج دهید → کار را خشک کنید",
                    "safety": "از رنگ‌های غیرسمی و خوراکی استفاده کنید"
                  },
                  {
                    "title": "کاربرگ تمرین دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ تمرین و تکرار دست ورزی",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "کاربرگ خلاق تابستانه دست ورزی و رنگ آمیزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-خلاق-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-خلاق-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.webp",
                    "desc": "کاربرگ خلاق تابستانه دست ورزی و رنگ آمیزی پیش دبستان یک فعالیت آموزشی جذاب و خلاقانه برای کودکان است. در این کاربرگ، کودک ابتدا شکل یک هواپیما را که در بخش"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "اتاق هنر و موسیقی — بخش 1 1 و اتاق هنر و موسیقی — بخش 1 2",
        "hotspots": [
          {
            "title": "اتاق هنر و موسیقی — بخش 1 1",
            "x": 26,
            "y": 52,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "نمایش خلاق — تمساح و طبیعت",
                    "type": "activity",
                    "desc": "تقویت همدلی، شناخت حیوانات و حرکاتابداعی",
                    "category": "نمایش خلاق",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "پارچه سبز/آبی، اسباب‌بازی حیوانات",
                    "instructions": "پارچه آبی را به عنوان آب و سبز را به عنوان جنگل پهن کنید → یکی کودک نقش تمساح را بازی می‌کند، بقیه حیوانات → تمساح گرسنه است، حیوانات باید با همکاری از آن فرار کنند → در پایان، تمساح هم دوستان پیدا می‌کند و بازی می‌کنند",
                    "safety": "حرکات تند و پرش از ارتفاع انجام نشود"
                  },
                  {
                    "title": "آشپزی ساده — سالاد میوه رنگارنگ",
                    "type": "activity",
                    "desc": "تقویت مهارت زندگی، شناخت میوه، تغذیه سالم و هماهنگی دست-چشم",
                    "category": "آشپزی ساده",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "میوه‌های متنوع (سیب، موز، پرتقال، انگور)، ظروف، چمچه",
                    "instructions": "دست‌ها را به خوبی بشویید → میوه‌ها را با کمک بزرگسالار برش دهید (استفاده از چاقوی پلاستیکی کودک) → میوه‌ها را در کاسه بزرگ بریزید و مخلوط کنید → در ظروف nhỏ برای همه تقسیم کنید و با هم بخورید",
                    "safety": "برش میوه فقط تحت نظارت مستقیم بزرگسالار و با ابزار مناسب کودکان"
                  },
                  {
                    "title": "آشپزی ساده — کوکی ساده شیرینی",
                    "type": "activity",
                    "desc": "تقویت شمارش، اندازه‌گیری، دنبال کردن دستورالعمل و حواس",
                    "category": "آشپزی ساده",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 40,
                    "materials": "آرد، شکر، روغن، تخم‌مرغ، شکلات‌چیپ، کاسه، قاشق",
                    "instructions": "مواد را با قاشق اندازه‌گیری کنید (کودک شمارش می‌کند) → مواد را در کاسه مخلوط کنید → خمیر را با دست گلوله کنید و روی تره بگذارید → در爐 پختن (فقط بزرگسالار) و بعد خنک خوردن",
                    "safety": "کار با فر و مواد داغ فقط توسط بزرگسالار"
                  },
                  {
                    "title": "آزمایش علوم — اثر پروانه (بافوم و سرکه)",
                    "type": "activity",
                    "desc": "شناخت واکنش شیمیایی، مشاهده газ و حباب (علم میان‌دست کودکان)",
                    "category": "آزمایش علوم",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "بطری، بافوم، سرکه، ظروف، رنگ خوراکی",
                    "instructions": "بافوم را در بطری بریزید → رنگ خوراکی اضافه کنید → سرکه را به آرامی اضافه کنید → مشاهده کنید: حباب‌های رنگی از بطری بیرون می‌ریزد",
                    "safety": "مواد را نچشید، دست‌ها را بعد از آزمایش بشویید"
                  },
                  {
                    "title": "مجموعه رایگان واحد کار علوم اول دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحدکار اعضای بدن جانوران علوم پیش دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T231641.086.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T231625.189.webp",
                    "desc": "کاربرگ واحدکار اعضای بدن جانوران آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن جانوران به کودکان پیش‌دبستانی طراحی شده است."
                  },
                  {
                    "title": "واحدکار غذای جانوران علوم پیش دبستانی",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آزمایش علوم — رنگ‌های جادویی (قلم‌رو و آب)",
                    "type": "activity",
                    "desc": "شناخت حلالیت، انتشار رنگ و ترکیب رنگ‌های اولیه",
                    "category": "آزمایش علوم",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "قلم‌رو، کاغذ فیلتر، ظروف، آب، قطره‌ریز",
                    "instructions": "با قلم‌رو دایره‌ای روی کاغذ فیلتر بکشید → کاغذ را طوری بگذارید که لبه در آب باشد → مشاهده کنید: آب بالا می‌رود و رنگ‌ها جدا می‌شوند → با رنگ‌های مختلف آزمایش کنید",
                    "safety": "از قلم‌روهای غیرسمی استفاده کنید"
                  },
                  {
                    "title": "کاردستی — چاپ با سبزیجات و میوه",
                    "type": "activity",
                    "desc": "تقویت حس لامسه، شناخت بافت و الگو، خلاقیت",
                    "category": "کاردستی پیشرفته",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "سیب‌زمینی، هویج، فلفل، رنگ، کاغذ، چاقو (بزرگسالار)",
                    "instructions": "سبزیجات را به نصف برش دهید (بزرگسالار) → برش را در رنگ بگذارید → روی کاغذ فشار دهید و بردارید → الگوهای مختلف را مشاهده و ترکیب کنید",
                    "safety": "برش سبزیجات فقط توسط بزرگسالار"
                  },
                  {
                    "title": "کاردستی — مجسمه خمیر بازی (Playdough Sculpture)",
                    "type": "activity",
                    "desc": "تقویت مهارت ظریف، قدرت دست، تخیل سه‌بعدی",
                    "category": "کاردستی پیشرفته",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 25,
                    "materials": "خمیر بازی، ابزارهای خمیر (وردنه، قطعه‌کننده، استامپ)",
                    "instructions": "خمیر را به کودک بدهید → ابزارها را معرفی کنید → از کودک بخواهید حیوان، غذا، یا خانه بسازد → مجسمه‌ها را در کلاس نمایش دهید",
                    "safety": "خمیر غیرسمی و مناسب سن استفاده کنید"
                  },
                  {
                    "title": "دانلود رایگان کاربرگ دست ورزی pdf",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-دست-ورزی-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-دست-ورزی-پیش-دبستانی.webp",
                    "desc": "کاربرگ دست ورزی با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. دانلود رایگان فایل pdf قابل چاپ."
                  },
                  {
                    "title": "کاربرگ دست ورزی (ماز) پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54301.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54291.jpg",
                    "desc": "این کاربرگ آموزشی با ظرافت خاصی برای تقویت مهارت‌های دست‌ورزی و هوش دیداری کودکان طراحی گردیده است."
                  },
                  {
                    "title": "کاربرگ دست ورزی نشانه های کلاس اول",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-نشانه-ها.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دست-ورزی-نشانه-های-کلاس-اول.webp",
                    "desc": "کاربرگ دست ورزی نشانه ها، ابزارهای کاربردی برای دست‌ورزی و تقویت مهارت‌های حرکتی ظریف دانش‌آموزان کلاس اول دبستان هستند که به طور مستقیم برای آموزش و تمرین"
                  }
                ]
              }
            ]
          },
          {
            "title": "اتاق هنر و موسیقی — بخش 1 2",
            "x": 68,
            "y": 50,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "نمایش خلاق — ما در فضا",
                    "type": "activity",
                    "desc": "تقویت تفکر انتزاعی، تعاون و زبان توصیفی",
                    "category": "نمایش خلاق",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "کارتن، رنگ، چسب، فویل المینیوم",
                    "instructions": "از کارتن یک خلبان فضا بسازید و با فویل بپوشانید → کودکان را دعوت کنید به عنوان خلبانان فضا بازی کنند → یک ماموریت gemeinschaft بسازید: یافتن ستاره گم‌شده → هر کودک یک نقش دارد: خلبان، ناوبر، دانشمند، گزارش‌دهنده",
                    "safety": "از لبه‌های تیز کارتن مراقبت کنید"
                  },
                  {
                    "title": "آشپزی ساده — نان پیتا و پنیر",
                    "type": "activity",
                    "desc": "تقویت مهارت دستوری، صبر، شناخت مواد غذایی",
                    "category": "آشپزی ساده",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "نان پیتا، پنیر، سبزیجات، kors, نوشیدنی",
                    "instructions": "نان را روی میز بگذارید → پنیر را با کارد پلاستیکی ملایم کنید → سبزی را بشویید و خشک کنید → نشتا را با هم درست کنید و لذت ببرید",
                    "safety": "از کارد پلاستیکی و غیرتیز استفاده کنید"
                  },
                  {
                    "title": "آزمایش علوم — باران در کاسه",
                    "type": "activity",
                    "desc": "شناخت چرخه آب، تبخیر و چگالی (علم ساده برای کودکان)",
                    "category": "آزمایش علوم",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "کاسه شیشه‌ای، آب جوش، قابلمه، یخ",
                    "instructions": "آب جوش را در کاسه بریزید (فقط بزرگسالار) → قابلمه را روی کاسه بگذارید → یخ را روی قابلمه بگذارید → مشاهده کنید: بخار روی پائینِ قابلمه قطره می‌شود مثل باران",
                    "safety": "آب جوش و کاسه داغ فقط توسط بزرگسالار، کودک فقط مشاهده می‌کند"
                  },
                  {
                    "title": "آزمایش علوم — مغناطیس و فلزات",
                    "type": "activity",
                    "desc": "شناخت خاصیت مغناطیس، طبقه‌بندی فلز/غیرفلز",
                    "category": "آزمایش علوم",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "مغناطیس قوی، اشیاء مختلف (کلید، چوب، پلاستیک، سکه، مشت)",
                    "instructions": "اشیاء را روی میز بگذارید → مغناطیس را به اشیاء نزدیک کنید → کودک حدس بزند کدام می‌چسبد و کدام نه → اشیاء را به دو گروه فلز/غیرفلز تقسیم کنید",
                    "safety": "مغناطیس کوچک را نبلعید، از مغناطیس‌های بزرگ استفاده کنید"
                  },
                  {
                    "title": "واحد کار علوم حرکت جانوارن پیش دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  },
                  {
                    "title": "واحد کار علوم حس بویایی اول دبستان",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حس-بویایی-اول-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حس-بویایی-اول-دبستان.webp",
                    "desc": "این واحد کار علوم حس بویایی اول دبستان یک فعالیت آموزشی ایده‌آل برای نوآموزان و دانش‌آموزان مقطع ابتدایی است که بر شناخت حس بویایی تمرکز دارد. تصویر اصلی، یک"
                  },
                  {
                    "title": "واحد کار علوم حواس پنج گانه پیش دبستانی",
                    "type": "pdf",
                    "category": "علوم",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حواس-پنج-گانه-پیش-دبستانی-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حواس-پنج-گانه-پیش-دبستانی.webp",
                    "desc": "حواس پنجگانه پنجره ما به سوی دنیای شگفت‌انگیز اطرافمان هستند. در این واحد کار علوم حواس پنج گانه پیش دبستانی، کودکان با چشم‌ها، گوش‌ها، بینی، زبان و پوست خود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "کاردستی — کاغذ ماشه (پیه‌ماشه)",
                    "type": "activity",
                    "desc": "تقویت بازیافت، مهارت دستوری، صبر و خلاقیت سه‌بعدی",
                    "category": "کاردستی پیشرفته",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 40,
                    "materials": "کاغذهای پاره، آب، خردکن، چسب، قالب، رنگ",
                    "instructions": "کاغذها را پاره کنید و در آب یک شب بگذارید → در خردکن به صورت ماشه در بیاورید → ماشه را در قالب بگذارید و آب را خارج کنید → بعد از خشک شدن، با رنگ تزیین کنید",
                    "safety": "استفاده از خردکن فقط توسط بزرگسالار"
                  },
                  {
                    "title": "کاردستی — קולاجطبیعت (Nature Collage)",
                    "type": "activity",
                    "desc": "ارتباط با طبیعت، наблюد، композиشن و چسباندن",
                    "category": "کاردستی پیشرفته",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "برگ، گل، خار، کاغذ مقوایی، چسب، کیسه جمع‌آوری",
                    "instructions": "با کودک در حیاط/پارک yürüyüş کنید و مواد طبیعی جمع کنید → مواد را روی میز چیدمان کنید → طراحی را روی کاغذ مقوایی برنامه‌ریزی کنید → با چسب مواد را ثابت کنید",
                    "safety": "از گیاهان سمی و حشرات مراقبت کنید، دست‌ها را بشویید"
                  },
                  {
                    "title": "کاردستی — نقاشی با ابزارهای غیرمتعارف",
                    "type": "activity",
                    "desc": "تقویت خلاقیت، تفکر انحرافی، حس لامسه",
                    "category": "کاردستی پیشرفته",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "جاریو، اسفنج، bala، سوته، پاشنه، مارک، رنگ، کاغذ بزرگ",
                    "instructions": "ابزارهای مختلف را در رنگ بگذارید → کودک را آزاد بگذارید با هر ابزاری نقاشی کند → تفاوت بافت‌ها و خطوط را بررسی کنید → بدون قضاوت، فرآیند را تحسین کنید",
                    "safety": "از رنگ‌های غیرسمی و قابل شستشو استفاده کنید"
                  },
                  {
                    "title": "کاربرگ دست ورزی نقطه چین پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-14.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/2-2.webp",
                    "desc": "کاربرگ دست ورزی نقطه چین پیش دبستان: این کاربرگ زیبا با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. کودکان با دنبال کردن خطوط نقطه‌چین، شکل‌های ساده"
                  },
                  {
                    "title": "کاربرگ دست ورزی و دقت و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5597.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-1-1.webp",
                    "desc": "کاربرگ دست ورزی و دقت و تمرکز در بالا بردن دقت و تمرکز کودکان پیش‌دبستانی اهمیت زیادی دارد زیرا این مهارت‌ها پایه و اساس رشد شناختی و تحصیلی آینده آنان را"
                  },
                  {
                    "title": "کاربرگ دست ورزی پیش دبستان",
                    "type": "pdf",
                    "category": "دست‌ورزی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/1-35.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-19-1.webp",
                    "desc": "کاربرگ دست ورزی پیش دبستان برای دانش‌آموزان مقطع پیش‌دبستان طراحی شده است تا مهارت‌های حرکتی ظریف و هماهنگی چشم و دست آن‌ها را تقویت کند."
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "motaleh",
    "folder": "motaleh",
    "name": "اتاق مطالعه و هوش",
    "icon": "📖",
    "heroPos": {
      "left": {
        "x": 15,
        "y": 50
      },
      "center": {
        "x": 50,
        "y": 55
      },
      "right": {
        "x": 80,
        "y": 45
      }
    },
    "views": {
      "herog": {
        "label": "داستان، علمی، مجله و صوتی",
        "hotspots": [
          {
            "title": "داستان",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "داستان زال و سیمرغ",
                    "type": "activity",
                    "desc": "آشنایی با شاهنامه فردوسی",
                    "category": "قصه‌گویی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "کتاب شاهنامه کودکان",
                    "instructions": "داستان زال و سیمرغ را انتخاب کنید → با زبان ساده تعریف کنید → از تصاویر استفاده کنید → درباره شجاعت و مهربانی صحبت کنید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ تابستانه خط زمینه پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_52891.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_52901.jpg",
                    "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."
                  },
                  {
                    "title": "کاربرگ تمرین فارسی صدای اول «ج» پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تمرین-فارسی-صدای-اول-ج-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تمرین-فارسی-صدای-اول-ج-پیش-دبستان.webp",
                    "desc": "این کاربرگ تمرین فارسی صدای اول «ج» پیش دبستان برای تقویت مهارت تشخیص صدای اول «ج» در کودکان طراحی شده است. هدف اصلی این تمرین، آشنایی کودکان با صدای ابتدایی"
                  },
                  {
                    "title": "کاربرگ خطوط شکسته و خمیده پیش‌دبستانی",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-شکسته-و-خمیده.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-شکسته-و-خمیده-524x800.webp",
                    "desc": "کاربرگ خطوط شکسته و خمیده پیش‌دبستانی با هدف تقویت هماهنگی چشم و دست، مهارت‌های حرکتی ظریف، کنترل مداد، افزایش تمرکز و آمادگی برای نوشتن طراحی شده است. کودک"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "ماز کف زمین (Unplugged Coding)",
                    "type": "activity",
                    "desc": "تقویت حل مسئله و تفکر منطقی",
                    "category": "هوش دیجیتال",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "نوار چسب",
                    "instructions": "با نوار چسب روی زمین ماز بسازید → از کودک بخواهید با دنبال کردن مسیر به گنج برسد → راهنمایی کنید → در پایان تشویق کنید",
                    "safety": "از سطح صاف استفاده کنید"
                  },
                  {
                    "title": "کاربرگ دقت و تمرکز پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-دقت-و-تمرکز-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-دقت-و-تمرکز-پیش-دبستان.webp",
                    "desc": "یکی از مهارت‌های کلیدی که پایه و اساس یادگیری ریاضی و خواندن در سال‌های ابتدایی دبستان است، &quot;دقت دیداری&quot; و &quot;تفکر منطقی&quot; است.این کاربرگ دقت و تمرکز پیش دبستان،"
                  },
                  {
                    "title": "کاربرگ رایگان تست هوش و دقت پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-2.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-3.webp",
                    "desc": "کاربرگ رایگان تست هوش و دقت پیش‌دبستانی با عنوان «دلبندم شکل‌های زیر را در تصویر بالا پیدا کن و رنگ‌آمیزی کن» یک فعالیت آموزشی جذاب برای کودکان است."
                  },
                  {
                    "title": "کاربرگ رایگان دقت و هوش پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رایگان-دقت-و-هوش-پیش-دبستانی-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رایگان-دقت-و-هوش-پیش-دبستانی.webp",
                    "desc": "این  کاربرگ رایگان دقت و هوش پیش دبستانی با هدف آموزش اسامی حیوانات و تقویت مهارت تطبیق در کودکان طراحی شده است. فلسفه اصلی این است که یادگیری از طریق بازی و"
                  }
                ]
              }
            ]
          },
          {
            "title": "علمی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "علمی",
                "items": [
                  {
                    "title": "داستان خاله سوسکه",
                    "type": "activity",
                    "desc": "آشنایی با قصه‌های فولکلور ایرانی",
                    "category": "قصه‌گویی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "داستان خاله سوسکه را تعریف کنید → با صداهای مختلف شخصیت‌ها را اجرا کنید → از کودک بخواهید همراهی کند → با هم بخندید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ خطوط پیش‌دبستانی",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-پیش‌دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-پیش‌دبستانی-627x800.webp",
                    "desc": "در کاربرگ خطوط پیش‌دبستانی، ما چند تا تصویر بامزه داریم: یک سیب مهربان و یک پروانه خوشگل. پایین صفحه هم چند تا تصویر دیگه منتظر شما هستند: یک ستاره، یک گل، یک"
                  },
                  {
                    "title": "کاربرگ دست ورزی خطوط نقطه‌چین پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5250.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5251.jpg",
                    "desc": "ین کاربرگ شاد و رنگارنگ پیش‌دبستانی، طراحی شده تا با استفاده از خطوط نقطه‌چین، مهارت‌های حرکتی ظریف کودکان را تقویت کند. ردگیری این خطوط، کودک را برای نوشتن"
                  },
                  {
                    "title": "کاربرگ صدا آموزی نشانه آ فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-1.webp",
                    "desc": "کاربرگ صدا آموزی نشانه آ فارسی پیش دبستان– آموزش صداآموزی و نشانه «آ» به کودکان پیش‌دبستان یکی از مراحل مهم در رشد زبانی و نگارش آنها است. در این مرحله،"
                  }
                ]
              }
            ]
          },
          {
            "title": "مجله",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "مجله",
                "items": [
                  {
                    "title": "ربات انسانی (Unplugged Coding)",
                    "type": "activity",
                    "desc": "آشنایی با مفهوم توالی دستورات",
                    "category": "هوش دیجیتال",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "",
                    "instructions": "یک کودک نقش ربات را بازی می‌کند → دیگری نقش برنامه‌نویس را دارد → برنامه‌نویس دستورهای جلو، چپ، راست، ایست می‌دهد → ربات باید دستورها را اجرا کند",
                    "safety": "در فضای امن انجام شود"
                  },
                  {
                    "title": "کاربرگ رنگ آمیزی و هوش پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-و-هوش-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-و-هوش-پیش-دبستانی.webp",
                    "desc": "سلام به کوچولوهای باهوش! 🎨 امروز یک بازی خیلی هیجان‌انگیز داریم. این کاربرگ رنگ آمیزی و هوش پیش دبستانی پر از شکل‌های مختلف و دوست‌داشتنی است. برای اینکه"
                  },
                  {
                    "title": "کاربرگ های تقویت حافظه دیداری و هوش فضایی پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-تقویت-حافظه-دیداری-و-هوش-فضایی-پیش-دبستانی-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگهای-تقویت-حافظه-دیداری-و-هوش-فضایی-پیش-دبستانی.webp",
                    "desc": "این مجموعه کاربرگ های تقویت حافظه دیداری و هوش فضایی پیش دبستانی یک منبع آموزشی تخصصی برای کودکان پیش‌دبستانی است که با هدف تقویت حافظه دیداری و درک روابط"
                  },
                  {
                    "title": "کاربرگ های هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-های-هوش-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-های-هوش-پیش-دبستان.webp",
                    "desc": "این کاربرگ های هوش پیش دبستان چیزی فراتر از یک نقاشی ساده است؛ این یک تمرین عالی برای تقویت هوش دیداری و افزایش دقت و تمرکز در کودکان پیش‌دبستانی است. کودک با"
                  }
                ]
              }
            ]
          },
          {
            "title": "صوتی",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "صوتی",
                "items": [
                  {
                    "title": "الگوی رقص (Unplugged Coding)",
                    "type": "activity",
                    "desc": "تقویت درک الگو",
                    "category": "هوش دیجیتال",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "موزیک",
                    "instructions": "یک الگوی حرکتی بسازید (دست، پا، دست، پا) → از کودک بخواهید الگو را تکرار کند → الگوهای پیچیده‌تر بسازید → با هم برقصید",
                    "safety": "از فضای کافی استفاده کنید"
                  },
                  {
                    "title": "کاربرگ هوش، دقت و ماز مسیریابی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/۲.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sa9892py.webp",
                    "desc": "این کاربرگ یک تمرین مهارتی جذاب برای تقویت هوش، دقت و توانایی مسیریابی در کودکان طراحی شده است."
                  },
                  {
                    "title": "کاربرگ‌ هوش خلاقیت پیش دبستانی (رایگان/pdf)",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ‌-هوش-خلاقیت-پیش-دبستانی.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ‌-هوش-خلاقیت-پیش-دبستانی.webp",
                    "desc": "کاربرگ‌ هوش خلاقیت پیش دبستانی مجموعه‌ای جذاب از تمرین‌های تصویری و فکری است که با هدف تقویت تمرکز، دقت، حافظه دیداری و تفکر منطقی کودکان طراحی شده است."
                  },
                  {
                    "title": "کاربرگ هوش و استعداد پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش-و-استعداد.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش-و-استعداد.webp",
                    "desc": "کاربرگ هوش و استعداد پیش دبستان: این کاربرگ به منظور تقویت مهارتهای شناختی و تحلیلی دانش آموزان طراحی شده است. تمرین اصلی آن شامل وصل کردن اجزای مرتبط به هم"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "منطق، شمارش، الگو و دسته‌بندی",
        "hotspots": [
          {
            "title": "منطق",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "قصه‌گویی قبل از خواب",
                    "type": "activity",
                    "desc": "تقویت تخیل و زبان از طریق قصه",
                    "category": "قصه‌گویی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کتاب قصه",
                    "instructions": "کتاب قصه مناسب سن کودک انتخاب کنید → در محیط آرام بنشینید → با صدای ملایم قصه را بخوانید → از کودک درباره قصه سوال بپرسید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ صدا آموزی نشانه پ فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-1.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-2.webp",
                    "desc": "کاربرگ صدا آموزی نشانه پ فارسی پیش دبستان – آموزش صدای «پ» به کودکان پیش‌دبستانی نیازمند روشی مثبت، بازی‌گونه و مراقبتی است تا آنها بتوانند به راحتی و بدون"
                  },
                  {
                    "title": "کاربرگ صدا (پ) فارسی پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-صدا-پ-پیش-دبستان-3.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-صدا-پ-پیش-دبستان.webp",
                    "desc": "آموزش حروف به کودکان، مثل کاشتن دانه در ذهن‌های کنجکاو آنهاست. کاربرگ صدا (پ) فارسی پیش دبستان، یک ابزار جذاب برای آشنایی بچه‌ها با صداهای ابتدایی کلمات است."
                  },
                  {
                    "title": "کاربرگ علوم (کارهای خطرناک) پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-کارهای-خطرناک-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-کارهای-خطرناک-پیش-دبستان.webp",
                    "desc": "امروز کاربرگ علوم (کارهای خطرناک) پیش دبستان را برای کودکان شما تهیه کرده ایم. کودکان کنجکاو همیشه به دنبال کشف دنیای اطراف هستند، اما بعضی از اشیاء خانه"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "کلیله و دمنه (بازنویسی)",
                    "type": "activity",
                    "desc": "آشنایی با ادبیات کهن ایران",
                    "category": "قصه‌گویی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کتاب کلیله و دمنه",
                    "instructions": "داستان ساده‌ای از کلیله و دمنه انتخاب کنید → با زبان ساده برای کودک تعریف کنید → از تصاویر کمک بگیرید → درباره پند داستان صحبت کنید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ لوحه نویسی حروف و الفبا",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه.webp",
                    "desc": "کاربرگ لوحه نویسی پیش دبستان: این کاربرگ ساده و در عین حال موثر، ابزاری عالی برای تقویت مهارت‌های حرکتی ظریف و هماهنگی چشم و دست در کودکان است. با تکرار"
                  },
                  {
                    "title": "کاربرگ مرور فارسی صدای آخر «ج» پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-فارسی-صدای-آخر-ج-پیش-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-فارسی-صدای-آخر-ج-پیش-دبستان.webp",
                    "desc": "این کاربرگ مرور فارسی صدای آخر «ج» پیش دبستان یک تمرین هدفمند برای تقویت تشخیص صدای پایانی «ج» در کودکان است. هدف اصلی این فعالیت، آشنایی کودک با صداها در"
                  },
                  {
                    "title": "کاربرگ مرور فارسی صدای آخر «پ» پیش دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/placeholder.webp",
                    "desc": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "شمارش",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "شمارش",
                "items": [
                  {
                    "title": "کتاب‌خوانی تعاملی",
                    "type": "activity",
                    "desc": "تقویت مهارت شنیداری و درک مطلب",
                    "category": "کتاب‌خوانی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "کتاب تصویری",
                    "instructions": "کتاب را باز کنید و تصاویر را نشان دهید → درباره تصاویر صحبت کنید → از کودک بخواهید داستان را تعریف کند → سوالاتی درباره داستان بپرسید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ نقاشی با نشانه های فارسی دبستان",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نقاشی-با-نشانه-های-فارسی-دبستان.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نقاشی-با-نشانه-های-فارسی-دبستان.webp",
                    "desc": "با کاربرگ نقاشی با نشانه های فارسی دبستان، کودکان شما می‌توانند با نشانه‌های &quot;س&quot; و &quot;ت&quot; آشنا شوند، آن‌ها را رنگ‌آمیزی کنند و خط بکشند. این فعالیت جذاب، علاوه"
                  },
                  {
                    "title": "کاربرگ واحد کار پیش دبستان &#8211; خط خمیده",
                    "type": "pdf",
                    "category": "فارسی",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-خط-خمیده.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-خط-خمیده.webp",
                    "desc": "آموزش مهارت‌های پیش‌نیاز نوشتن، یکی از مهم‌ترین گام‌ها در مسیر آماده‌سازی کودکان برای ورود به مدرسه است. کاربرگ واحد کار پیش دبستان - خط خمیده، ابزاری عالی"
                  }
                ]
              }
            ]
          },
          {
            "title": "الگو",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "الگو",
                "items": [
                  {
                    "title": "شعر کودکانه فارسی",
                    "type": "activity",
                    "desc": "تقویت زبان و آشنایی با شعر فارسی",
                    "category": "شعر",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "کتاب شعر کودکانه",
                    "instructions": "شعری ساده انتخاب کنید → با کودک شعر را بخوانید → از او بخواهید تکرار کند → با هم لذت ببرید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "دسته‌بندی",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "دسته‌بندی",
                "items": [
                  {
                    "title": "نمایش عروسکی",
                    "type": "activity",
                    "desc": "تقویت تخیل و مهارت‌های اجتماعی",
                    "category": "نمایش عروسکی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "عروسک دستی, صحنه نمایش",
                    "instructions": "عروسک‌ها را آماده کنید → داستانی ساده انتخاب کنید → نمایش را اجرا کنید → کودک را در نمایش مشارکت دهید",
                    "safety": "از عروسک‌های امن استفاده کنید"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "آزمایش، مشاهده، نقشه و زمان",
        "hotspots": [
          {
            "title": "آزمایش",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "مرتب‌سازی اشیا (Unplugged Coding)",
                    "type": "activity",
                    "desc": "یادگیری مفهوم الگوریتم مرتب‌سازی",
                    "category": "هوش دیجیتال",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "اشیاء مختلف",
                    "instructions": "اشیاء مختلف را روی میز بگذارید → از کودک بخواهید بر اساس رنگ یا اندازه مرتب کند → راهنمایی کنید → در پایان نتیجه را بررسی کنید",
                    "safety": "از اشیاء امن استفاده کنید"
                  },
                  {
                    "title": "کاربرگ هوش و استعداد یابی پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-1.webp",
                    "desc": "کاربرگ هوش و استعداد یابی پیش دبستان:  این کاربرگ جذاب برای تقویت مهارت‌های دیداری و شناختی در کودکان پیش‌دبستانی و ابتدایی طراحی شده است. در بخش اول، با"
                  },
                  {
                    "title": "کاربرگ هوش و تشخیص سایه پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-15.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/2-3.webp",
                    "desc": "کاربرگ هوش و تشخیص سایه پیش دبستان: این کاربرگ زیبا با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. کودکان با دنبال کردن خطوط نقطه‌چین، شکل‌های ساده"
                  },
                  {
                    "title": "کاربرگ هوش و دقت پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-هوش-و-دقت-پیش-دبستان-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-هوش-و-دقت-پیش-دبستان.webp",
                    "desc": "کاربرگ هوش و دقت پیش دبستان، با استفاده از تصاویر بامزه جوجه و تخم‌مرغ شکسته، یک فعالیت چالش‌برانگیز و سرگرم‌کننده برای کودکان ۳ تا ۷ سال است. این تمرین نه"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "کتابخانه کوچولو",
                    "type": "activity",
                    "desc": "ایجاد عادت مطالعه",
                    "category": "کتاب‌خوانی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کتاب‌های متنوع",
                    "instructions": "گوشه‌ای آرام برای مطالعه درست کنید → کتاب‌های مختلف در دسترس بگذارید → از کودک بخواهید کتاب انتخاب کند → با هم کتاب را ورق بزنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "مشاهده",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "مشاهده",
                "items": [
                  {
                    "title": "کارت دستور غذا (Unplugged Coding)",
                    "type": "activity",
                    "desc": "یادگیری مفهوم توالی و ترتیب",
                    "category": "هوش دیجیتال",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کارت‌های تصویری",
                    "instructions": "مراحل ساخت ساندویچ را روی کارت‌ها بنویسید → کارت‌ها را به ترتیب درست بچینید → از کودک بخواهید مراحل را دنبال کند → با هم ساندویچ بسازید",
                    "safety": ""
                  },
                  {
                    "title": "کاربرگ هوش و دقت پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-هوش-و-دقت-پیش-دبستانی-.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-هوش-و-دقت-پیش-دبستانی.webp",
                    "desc": "این کاربرگ هوش و دقت پیش دبستانی که با تصاویر شاد و مرتبط با محیط مدرسه طراحی شده، ابزاری عالی برای این منظور است! هدف اصلی این فعالیت، بهبود مهارت‌های"
                  },
                  {
                    "title": "کاربرگ هوش پیش دبستان",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش.webp",
                    "desc": "کاربرگ هوش پیش دبستان: این کاربرگ آموزشی به منظور تقویت مهارتهای ارتباطی و شناختی دانش آموزان طراحی شده است. تمرین اصلی آن شامل وصل کردن اجزای مرتبط به هم است"
                  },
                  {
                    "title": "کاربرگ هوش پیش دبستانی",
                    "type": "pdf",
                    "category": "هوش و تمرکز",
                    "audience": "کودک",
                    "age": "پیش‌دبستان (۴-۶ سال)",
                    "source": "سمیه روحی",
                    "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/هوش.pdf",
                    "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/هوش1.jpg",
                    "desc": "کاربرگ هوش پیش دبستانی با هدف پرورش دقت دیداری، مهارت تطبیق و تقویت حافظه‌ی تصویری طراحی شده است."
                  }
                ]
              }
            ]
          },
          {
            "title": "نقشه",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "نقشه",
                "items": [
                  {
                    "title": "شعر با قافیه",
                    "type": "activity",
                    "desc": "تقویت آگاهی واجی و زبان",
                    "category": "شعر",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "شعرهای قافیه‌دار",
                    "instructions": "شعری با قافیه انتخاب کنید → با هم بخوانید → کلمات قافیه را مشخص کنید → از کودک بخواهید کلمه قافیه بگوید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "زمان",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "زمان",
                "items": [
                  {
                    "title": "داستان‌سازی گروهی",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و زبان",
                    "category": "قصه‌گویی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "",
                    "instructions": "یک جمله شروع کنید: یک روز یک شیر...  → از کودک بخواهید جمله بعدی را بگوید → نوبتی ادامه دهید → در پایان داستان را بخوانید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "salamat",
    "folder": "salamat",
    "name": "اتاق بهداشت و سلامت",
    "icon": "🏥",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 60
      },
      "right": {
        "x": 82,
        "y": 48
      }
    },
    "views": {
      "herog": {
        "label": "میوه، صبحانه، آب و میان‌وعده",
        "hotspots": [
          {
            "title": "میوه",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "خواب کافی",
                    "type": "activity",
                    "desc": "آشنایی با اهمیت خواب کافی",
                    "category": "عادت سالم",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "درباره اهمیت خواب صحبت کنید → برنامه خواب منظم تنظیم کنید → قبل از خواب فعالیت آرام انجام دهید → در ساعت مشخص بخوابید",
                    "safety": ""
                  },
                  {
                    "title": "روش صحیح شستن دست‌ها",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "دانشگاه کوچک",
                    "desc": "آموزش گام‌به‌گام شستن دست با صابون پیش از غذا و پس از دستشویی، همراه با بازی و شعر کودکانه."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "گفتگو درباره بدن من",
                    "type": "activity",
                    "desc": "آموزش حریم شخصی بدن",
                    "category": "آموزش ایمنی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "به کودک یاد دهید بدنش متعلق به خودش است → آموزش دهید اگر کسی او را ناراحت کرد، به والد بگوید → قانون لباس شنا را توضیح دهید → به کودک یاد دهید «نه» بگوید",
                    "safety": "این آموزش حساس باید با راهنمایی والد انجام شود"
                  }
                ]
              }
            ]
          },
          {
            "title": "صبحانه",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "صبحانه",
                "items": [
                  {
                    "title": "ورزش صبحگاهی",
                    "type": "activity",
                    "desc": "ایجاد عادت فعالیت بدنی",
                    "category": "عادت سالم",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "فضای باز",
                    "instructions": "چند حرکت ساده کششی انجام دهید → با هم بدوید یا راه بروید → بازی‌های حرکتی انجام دهید → هر روز در ساعت مشخص تکرار کنید",
                    "safety": "در فضای امن و بدون مانع ورزش کنید"
                  },
                  {
                    "title": "عادت روزانه‌ی مسواک‌زدن",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "دانشگاه کوچک",
                    "desc": "مسواک‌زدن پس از غذا با تشویق و تکرار مداوم، یکی از پایه‌ای‌ترین عادت‌های بهداشت فردی کودک است."
                  }
                ]
              }
            ]
          },
          {
            "title": "آب",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "آب",
                "items": [
                  {
                    "title": "نوشیدن آب",
                    "type": "activity",
                    "desc": "ایجاد عادت نوشیدن آب",
                    "category": "عادت سالم",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "لیوان آب",
                    "instructions": "درباره اهمیت آب صحبت کنید → لیوان آب را به کودک بدهید → در طول روز آب بدهید → به جای نوشابه، آب بنوشید",
                    "safety": ""
                  },
                  {
                    "title": "نقش الگوبرداری در بهداشت فردی",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "دانشگاه کوچک",
                    "desc": "کودکان با تقلید از رفتار بزرگ‌ترها بهداشت فردی را بهتر یاد می‌گیرند؛ الگو بودن مربی و والدین مهم است."
                  }
                ]
              }
            ]
          },
          {
            "title": "میان‌وعده",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "میان‌وعده",
                "items": [
                  {
                    "title": "بازی حرکت و ایست",
                    "type": "activity",
                    "desc": "تقویت خودتنظیمی و حرکات درشت",
                    "category": "عادت سالم",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "موسیقی",
                    "instructions": "موسیقی پخش کنید → کودک باید برقصد → وقتی موسیقی قطع شد، بایستد → با هم بازی کنید",
                    "safety": "در فضای امن انجام دهید"
                  },
                  {
                    "title": "تفاوت بهداشت فردی و اجتماعی",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "دنیای اندیشه",
                    "desc": "رعایت بهداشت فردی مثل استحمام و پوشاک تمیز، در واقع مسئولیتی در قبال سلامت کل جامعه هم هست."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "دست‌ها، مسواک، حمام و صورت",
        "hotspots": [
          {
            "title": "دست‌ها",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "شستن دست‌ها",
                    "type": "activity",
                    "desc": "یادگیری مراحل صحیح شستن دست",
                    "category": "بهداشت شخصی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "آب, صابون, دستمال",
                    "instructions": "دست‌ها را خیس کنید → صابون بزنید → ۲۰ ثانیه بمالید → آب بکشید و خشک کنید",
                    "safety": "دمای آب را کنترل کنید"
                  },
                  {
                    "title": "اصول تغذیه‌ی متعادل کودک",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "matyar-solaleh",
                    "desc": "هر وعده‌ی غذایی کودک باید ترکیبی از پروتئین، غلات سبوس‌دار و چربی‌های سالم مثل روغن زیتون داشته باشد."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "میوه‌های رنگارنگ",
                    "type": "activity",
                    "desc": "آشنایی با میوه‌های مختلف",
                    "category": "تغذیه",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "میوه‌های مختلف",
                    "instructions": "میوه‌های مختلف را نشان دهید → نام هر میوه را بگویید → از کودک بخواهید میوه را لمس کند → با هم میوه بخورید",
                    "safety": "میوه را به قطعات کوچک برش دهید تا خطر خفگی نداشته باشد"
                  }
                ]
              }
            ]
          },
          {
            "title": "مسواک",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "مسواک",
                "items": [
                  {
                    "title": "مسواک زدن",
                    "type": "activity",
                    "desc": "یادگیری مسواک زدن صحیح",
                    "category": "بهداشت شخصی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "مسواک, خمیر دندان",
                    "instructions": "خمیر دندان به اندازه نخود روی مسواک بگذارید → مسواک را با حرکت دایره‌ای حرکت دهید → سطح بیرونی، داخلی و جویدن دندان‌ها را تمیز کنید → دهان را بشویید",
                    "safety": "از مسواک نرم و خمیر دندان مناسب کودکان استفاده کنید"
                  },
                  {
                    "title": "جایگزینی نوشیدنی شیرین با آب یا شیر",
                    "type": "activity",
                    "category": "اتاق بهداشت و سلامت",
                    "audience": "مربی",
                    "source": "زونکیدو",
                    "desc": "برای کاهش مصرف قند روزانه، بهتر است نوشیدنی‌های شیرین با آب یا شیر جایگزین شوند."
                  }
                ]
              }
            ]
          },
          {
            "title": "حمام",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "حمام",
                "items": [
                  {
                    "title": "عطسه و سرفه آداب",
                    "type": "activity",
                    "desc": "یادگیری آداب عطسه و سرفه",
                    "category": "بهداشت شخصی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "هنگام عطسه یا سرفه، دهان را با آرنج بپوشانید → از دستمال استفاده کنید → بعد از آن دست‌ها را بشویید → این عادت را در خانه تمرین کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "صورت",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "صورت",
                "items": [
                  {
                    "title": "بشقاب سالم",
                    "type": "activity",
                    "desc": "شناخت الگوی بشقاب سالم",
                    "category": "تغذیه",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تصاویر غذاها, بشقاب",
                    "instructions": "تصاویر غذاها را نشان دهید → از کودک بخواهید بشقاب سالم بچیند → درباره گروه‌های غذایی صحبت کنید → با هم بشقاب واقعی بسازید",
                    "safety": "این یک آموزش عمومی است و جایگزین توصیه پزشک نیست"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "ورزش، خواب، نور و هوا",
        "hotspots": [
          {
            "title": "ورزش",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کمک خواستن",
                    "type": "activity",
                    "desc": "یادگیری کمک خواستن در شرایط خطر",
                    "category": "آموزش ایمنی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "سناریوهای مختلف را مطرح کنید → از کودک بپرسید چه کار می‌کند → راه‌های کمک خواستن را آموزش دهید → شماره‌های اضطراری را به کودک آموزش دهید",
                    "safety": "آموزش بدون ترس‌افزایی انجام شود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "وقت بازی در فضای باز",
                    "type": "activity",
                    "desc": "ترغیب به فعالیت بدنی روزانه",
                    "category": "عادت سالم",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "فضای باز",
                    "instructions": "هر روز زمانی برای بازی در فضای باز اختصاص دهید → بازی‌های حرکتی انجام دهید → از نشستن طولانی مدت جلوگیری کنید → با هم لذت ببرید",
                    "safety": "در ساعات گرم روز از بازی زیر آفتاب خودداری کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "خواب",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "خواب",
                "items": [
                  {
                    "title": "چراغ راهنمایی",
                    "type": "activity",
                    "desc": "آشنایی با قوانین عبور از خیابان",
                    "category": "آموزش ایمنی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تصاویر چراغ راهنمایی",
                    "instructions": "تصاویر چراغ راهنمایی را نشان دهید → معنی هر رنگ را توضیح دهید → با هم عبور از خیابان را تمرین کنید → همیشه دست والد را بگیرد",
                    "safety": "این آموزش باید همراه با تمرین واقعی و نظارت والد باشد"
                  }
                ]
              }
            ]
          },
          {
            "title": "نور",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "نور",
                "items": [
                  {
                    "title": "ناخن کوتاه",
                    "type": "activity",
                    "desc": "یادگیری اهمیت کوتاه نگه داشتن ناخن",
                    "category": "بهداشت شخصی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "ناخن‌گیر",
                    "instructions": "درباره اهمیت کوتاه بودن ناخن صحبت کنید → ناخن‌های کودک را کوتاه کنید → به کودک یاد دهید خودش ناخن‌هایش را چک کند → این کار را به عادت هفتگی تبدیل کنید",
                    "safety": "کوتاه کردن ناخن باید توسط بزرگسال انجام شود"
                  }
                ]
              }
            ]
          },
          {
            "title": "هوا",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "هوا",
                "items": [
                  {
                    "title": "غذای متنوع",
                    "type": "activity",
                    "desc": "آشنایی با تنوع غذایی",
                    "category": "تغذیه",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تصاویر گروه‌های غذایی",
                    "instructions": "تصاویر گروه‌های غذایی را نشان دهید → از کودک بخواهید از هر گروه انتخاب کند → درباره اهمیت تنوع صحبت کنید → با هم وعده غذایی متنوع بچینید",
                    "safety": "این آموزش عمومی است و جایگزین توصیه پزشک نیست"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "khab",
    "folder": "khab",
    "name": "اتاق خواب",
    "icon": "😴",
    "heroPos": {
      "left": {
        "x": 15,
        "y": 60
      },
      "center": {
        "x": 50,
        "y": 55
      },
      "right": {
        "x": 80,
        "y": 50
      }
    },
    "views": {
      "herog": {
        "label": "محیط، تنفس، آرامش و تصویر",
        "hotspots": [
          {
            "title": "محیط",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "محیط",
                "items": [
                  {
                    "title": "قصه‌سازی خواب",
                    "type": "activity",
                    "desc": "تخیل آرام و اتصال عاطفی",
                    "category": "قصه خواب",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "شروع قصه را بگویید (یک شب، یک ستاره...) → از کودک بخواهید ادامه دهد → قصه را آرام به پایان برسانید → با شب بخیر گفتن تمام کنید",
                    "safety": ""
                  },
                  {
                    "title": "تنظیم تدریجی ساعت خواب",
                    "type": "activity",
                    "category": "اتاق خواب",
                    "audience": "مربی",
                    "source": "باشگاه خبرنگاران جوان",
                    "desc": "تغییر ناگهانی زمان خواب برای کودک استرس‌زاست؛ بهتر است ساعت خواب هر چند شب کمی زودتر تنظیم شود."
                  }
                ]
              }
            ]
          },
          {
            "title": "تنفس",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "تنفس",
                "items": [
                  {
                    "title": "نفس عمیق آرامش‌بخش",
                    "type": "activity",
                    "desc": "آموزش تنفس آرام برای خواب",
                    "category": "آرام‌سازی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "",
                    "instructions": "دراز بکشید → از کودک بخواهید نفس عمیق بکشد → هوا را آرام بیرون بدهد → ۵ بار تکرار کنید",
                    "safety": ""
                  },
                  {
                    "title": "روتین آرام‌سازی پیش از خواب",
                    "type": "activity",
                    "category": "اتاق خواب",
                    "audience": "مربی",
                    "source": "کودکان",
                    "desc": "یک برنامه‌ی ثابت پیش از خواب مثل پوشیدن لباس خواب، مسواک و قصه، به کودک کمک می‌کند راحت‌تر بخوابد."
                  }
                ]
              }
            ]
          },
          {
            "title": "آرامش",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "آرامش",
                "items": [
                  {
                    "title": "آرام‌سازی عضلات",
                    "type": "activity",
                    "desc": "آرام کردن بدن پیش از خواب",
                    "category": "آرام‌سازی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "از کودک بخواهید دست‌ها را مشت کند → سپس رها کند → همین کار را برای پاها و شانه‌ها انجام دهد → با هم آرام نفس بکشید",
                    "safety": ""
                  },
                  {
                    "title": "دوری از صفحه‌نمایش پیش از خواب",
                    "type": "activity",
                    "category": "اتاق خواب",
                    "audience": "مربی",
                    "source": "باشگاه خبرنگاران جوان",
                    "desc": "نور آبی وسایل الکترونیکی تولید هورمون ملاتونین را مختل می‌کند و باید پیش از خواب کنار گذاشته شوند."
                  }
                ]
              }
            ]
          },
          {
            "title": "تصویر",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "تصویر",
                "items": [
                  {
                    "title": "آیین خواب منظم",
                    "type": "activity",
                    "desc": "ایجاد روتین خواب منظم",
                    "category": "آرام‌سازی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "",
                    "instructions": "هر شب در ساعت مشخص شروع کنید → فعالیت آرام (قصه یا لالایی) انجام دهید → نور را کم کنید → خداحافظی آرام و خواب",
                    "safety": ""
                  },
                  {
                    "title": "صبر در برابر مقاومت کودک برای خواب",
                    "type": "activity",
                    "category": "اتاق خواب",
                    "audience": "مربی",
                    "source": "borna.news",
                    "desc": "سازگاری کودک با یک برنامه‌ی خواب جدید ممکن است زمان ببرد و نیاز به صبر و درک دارد."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "لالایی، قصه، آمادگی و مسواک",
        "hotspots": [
          {
            "title": "لالایی",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "لالایی",
                "items": [
                  {
                    "title": "لالایی لالا",
                    "type": "activity",
                    "desc": "آرامش و آمادگی برای خواب",
                    "category": "لالایی",
                    "ageMin": 0,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "نور اتاق را کم کنید → لالایی را با صدای ملایم بخوانید → کودک را در آغوش بگیرید → با آرامش لالایی را تکرار کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "قصه",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "قصه",
                "items": [
                  {
                    "title": "لایی لایی گل پونه",
                    "type": "activity",
                    "desc": "آرامش کودک با لالایی سنتی",
                    "category": "لالایی",
                    "ageMin": 0,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "محیط آرام و کم‌نور آماده کنید → لالایی را ملایم بخوانید → کودک را نرم تکان دهید → تکرار کنید تا کودک آرام شود",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "آمادگی",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "آمادگی",
                "items": [
                  {
                    "title": "ناز نازک من",
                    "type": "activity",
                    "desc": "ایجاد احساس امنیت و آرامش",
                    "category": "لالایی",
                    "ageMin": 0,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "کودک را در آغوش بگیرید → لالایی را با صدای نرم بخوانید → نور را کم کنید → بدون حرکت ناگهانی، آرام بمانید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "مسواک",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "مسواک",
                "items": [
                  {
                    "title": "قصه خواب آرام",
                    "type": "activity",
                    "desc": "آرامش و تخیل پیش از خواب",
                    "category": "قصه خواب",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "کتاب قصه",
                    "instructions": "قصه‌ای آرام و بدون هیجان انتخاب کنید → با صدای ملایم بخوانید → از تصاویر آرام استفاده کنید → با جمله‌ای آرام قصه را تمام کنید",
                    "safety": "از قصه‌های ترسناک یا هیجانی خودداری کنید"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "صبح، کشش، شستشو و لباس",
        "hotspots": [
          {
            "title": "صبح",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "صبح",
                "items": [
                  {
                    "title": "موسیقی آرام بدون کلام",
                    "type": "activity",
                    "desc": "آرامش با موسیقی ملایم",
                    "category": "موسیقی آرام",
                    "ageMin": 0,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "بلندگو",
                    "instructions": "موسیقی آرام بدون کلام انتخاب کنید → صدا را کم نگه دارید → نور را کم کنید → تا خوابیدن کودک پخش کنید",
                    "safety": "صدا را کم نگه دارید تا به شنوایی آسیب نزند"
                  }
                ]
              }
            ]
          },
          {
            "title": "کشش",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "کشش",
                "items": [
                  {
                    "title": "صدای باران آرام",
                    "type": "activity",
                    "desc": "ایجاد محیط آرام با صدای طبیعت",
                    "category": "موسیقی آرام",
                    "ageMin": 0,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "بلندگو",
                    "instructions": "صدای باران را پخش کنید → صدا را بسیار کم تنظیم کنید → محیط را تاریک کنید → تا خوابیدن کودک ادامه دهید",
                    "safety": "صدا را کم نگه دارید"
                  }
                ]
              }
            ]
          },
          {
            "title": "شستشو",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "شستشو",
                "items": [
                  {
                    "title": "شمارش ستاره‌ها",
                    "type": "activity",
                    "desc": "آرامش با تخیل و شمارش",
                    "category": "آرام‌سازی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "",
                    "instructions": "چراغ‌های سقف را مثل ستاره تصور کنید → با هم ستاره‌ها را بشمارید → آرام و شمرده بشمارید → تا خوابیدن ادامه دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "لباس",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "لباس",
                "items": [
                  {
                    "title": "لالایی محلی (کردی/آذری/لری)",
                    "type": "activity",
                    "desc": "آرامش با لالایی محلی خانواده",
                    "category": "لالایی",
                    "ageMin": 0,
                    "ageMax": 3,
                    "duration": 10,
                    "materials": "",
                    "instructions": "لالایی به زبان محلی خانواده انتخاب کنید → با صدای ملایم بخوانید → کودک را آرام تکان دهید → تکرار کنید تا کودک بخوابد",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "moraabi",
    "folder": "moraabi",
    "name": "اتاق مربی",
    "icon": "👩‍🏫",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 60
      },
      "right": {
        "x": 85,
        "y": 45
      }
    },
    "views": {
      "herog": {
        "label": "فارسی، انگلیسی، شعر و داستان",
        "hotspots": [
          {
            "title": "فارسی",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "تنظیم هیجان مربی",
                    "type": "activity",
                    "desc": "یادگیری تنظیم هیجان در محیط کار",
                    "category": "تکنیک تربیتی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "قبل از واکنش، نفس عمیق بکشید → احساسات خود را بشناسید → وقتی عصبانی هستید، کوتاه صحبت کنید → در پایان روز، وقایع را مرور کنید",
                    "safety": ""
                  },
                  {
                    "title": "روتین روزانه‌ی ثابت برای کلاس",
                    "type": "activity",
                    "category": "اتاق مربی",
                    "audience": "مربی",
                    "source": "مهدکودک مهرآیین",
                    "desc": "برنامه‌ی روزانه‌ی مشخص همراه با نشانه‌های بصری، احساس امنیت و آرامش کودک را در کلاس افزایش می‌دهد."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فعالیت آماده: باغچه کلاسی",
                    "type": "activity",
                    "desc": "اجرای فعالیت کاشت در کلاس",
                    "category": "فعالیت آماده",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "گلدان, خاک, بذر, آب",
                    "instructions": "گلدان‌ها را آماده کنید → هر کودک یک بذر بکارد → نوبتی آبیاری کنند → رشد گیاهان را ثبت کنید",
                    "safety": "از خاک تمیز استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "انگلیسی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "گزارش پیشرفت به والد",
                    "type": "activity",
                    "desc": "یادگیری نوشتن گزارش پیشرفت",
                    "category": "ارتباط",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "قالب گزارش",
                    "instructions": "نقاط قوت را بنویسید → قدم بعدی را مشخص کنید → فعالیت پیشنهادی خانگی بدهید → زبان ساده و بدون قضاوت استفاده کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "مدیریت زمان کلاس",
                    "type": "activity",
                    "desc": "یادگیری مدیریت زمان در کلاس",
                    "category": "مدیریت کلاس",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تایمر",
                    "instructions": "برنامه روزانه مشخص تنظیم کنید → زمان هر فعالیت را مشخص کنید → از تایمر بصری استفاده کنید → برای انتقال بین فعالیت‌ها، آهنگ پخش کنید",
                    "safety": ""
                  },
                  {
                    "title": "مدیریت کلاس بدون تنبیه",
                    "type": "activity",
                    "category": "اتاق مربی",
                    "audience": "مربی",
                    "source": "هیوا",
                    "desc": "مربی حرفه‌ای با خوش‌اخلاقی و بدون دعوا و تنبیه، تمرکز کودکان را به فعالیت برمی‌گرداند."
                  }
                ]
              }
            ]
          },
          {
            "title": "شعر",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "دعوت به جلسه اولیا",
                    "type": "activity",
                    "desc": "یادگیری برگزاری جلسه اولیا",
                    "category": "ارتباط",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "دعوت‌نامه, دستور جلسه",
                    "instructions": "موضوع جلسه را مشخص کنید → دعوت‌نامه بفرستید → جلسه را با نقاط قوت شروع کنید → به سوالات والد پاسخ دهید",
                    "safety": ""
                  },
                  {
                    "title": "اجزای یک طرح درس کامل",
                    "type": "activity",
                    "category": "اتاق مربی",
                    "audience": "مربی",
                    "source": "همیار مدیر ابتدایی",
                    "desc": "طرح درس خوب شامل هدف کلی، ارزشیابی تشخیصی، آماده‌سازی انگیزشی و روش تدریس مشخص است."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "شناسایی اولیه نیازهای ویژه کودک",
                    "type": "activity",
                    "desc": "آشنایی با نشانه‌های اولیه نیازهای ویژه و تفاوت آن با تاخیر رشدی عادی",
                    "category": "کودکان استثنایی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "چک‌لیست مشاهده, دفترچه یادداشت",
                    "instructions": "تاخیرهای رشدی عادی (مثلاً دیر حرف زدن) را از نشانه‌های نگران‌کننده جدا کنید → نشانه‌های زیر را رصد کنید: عدم تماس چشمی، تکرار رفتارها، حساسیت شدید حسی، عدم پاسخ به نام → مشاهدات را بدون قضاوت و با ذکر تاریخ ثبت کنید → در صورت نگرانی، با والد و متخصص مشورت کنید — هرگز خودتان تشخیص ندهید",
                    "safety": "تشخیص نهایی با متخصص (روانشناس کودک) است، نه مربی مهد"
                  }
                ]
              }
            ]
          },
          {
            "title": "داستان",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "فعالیت آماده: کارگاه حسی",
                    "type": "activity",
                    "desc": "اجرای کارگاه حسی برای کودکان",
                    "category": "فعالیت آماده",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 30,
                    "materials": "خمیر, آرد, برنج, ظرف‌های مختلف",
                    "instructions": "مواد حسی را در ظرف‌ها بریزید → کودکان را تشویق کنید لمس کنند → در حین بازی، واژگان را آموزش دهید → بعد از کارگاه، دست‌ها را بشویید",
                    "safety": "از مواد غیرسمی و امن استفاده کنید و بر کودکان نظارت کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "برنامه آموزشی فردی (IEP) برای کودک استثنایی",
                    "type": "activity",
                    "desc": "نوشتن و اجرای برنامه آموزشی فردی برای کودک با نیازهای ویژه",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 40,
                    "materials": "قالب IEP, گزارش ارزیابی متخصص, خودکار",
                    "instructions": "اطلاعات کودک (نام، سن، نوع نیاز ویژه) را ثبت کنید → اهداف کوتاه‌مدت (۳ ماهه) قابل اندازه‌گیری بنویسید → استراتژی‌های آموزشی مشخص تعیین کنید → تاریخ بازنگری و معیارهای موفقیت را مشخص کنید",
                    "safety": "IEP باید با همکاری والد و متخصص نوشته شود"
                  },
                  {
                    "title": "اهمیت گوش‌دادن به کنجکاوی کودکان",
                    "type": "activity",
                    "category": "اتاق مربی",
                    "audience": "مربی",
                    "source": "هیوا",
                    "desc": "مربی خوب باید با دقت به سوالات کودکان گوش دهد و دانش کافی برای پاسخ‌گویی داشته باشد."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "لالایی، قصه، آمادگی و مسواک",
        "hotspots": [
          {
            "title": "لالایی",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "مدیریت رفتار بدون تنبیه",
                    "type": "activity",
                    "desc": "یادگیری هدایت رفتار کودک بدون تنبیه",
                    "category": "مدیریت کلاس",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "علت رفتار کودک را بررسی کنید، نه فقط خود رفتار را → از هدایت مثبت و پیامدهای طبیعی استفاده کنید → احساسات خودتان را تنظیم کنید → با کودک به صورت محترمانه صحبت کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "ارتباط با والد",
                    "type": "activity",
                    "desc": "یادگیری ارتباط موثر با والد",
                    "category": "ارتباط",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "گزارش‌ها را ساده و بدون اصطلاح فنی بنویسید → نقاط قوت کودک را اول بگویید → قدم بعدی پیشنهاد دهید → هرگز کودک را با دیگران مقایسه نکنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "قصه",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "مشاهده و مستندسازی",
                    "type": "activity",
                    "desc": "یادگیری ثبت مشاهدات رشدی کودک",
                    "category": "ارزیابی رشد",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "دفترچه, دوربین",
                    "instructions": "در حین بازی کودک را مشاهده کنید → لحظات مهم را یادداشت یا عکس بگیرید → مشاهدات را بر اساس حوزه‌های رشدی دسته‌بندی کنید → مشاهدات را در پرونده کودک ثبت کنید",
                    "safety": "با رضایت والدین از کودک عکس بگیرید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آموزش فراگیر",
                    "type": "activity",
                    "desc": "آشنایی با آموزش کودکان با نیازهای ویژه",
                    "category": "تکنیک تربیتی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "",
                    "instructions": "تفاوت‌های فردی کودکان را بپذیرید → محیط را برای همه کودکان در دسترس کنید → از همکاری متخصصان استفاده کنید → بدون برچسب زدن به کودک، حمایت کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "آمادگی",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "برنامه‌ریزی فعالیت هفتگی",
                    "type": "activity",
                    "desc": "یادگیری برنامه‌ریزی فعالیت‌های متنوع",
                    "category": "مدیریت کلاس",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "جدول برنامه, مداد",
                    "instructions": "فعالیت‌ها را بر اساس حوزه‌های رشدی برنامه‌ریزی کنید → تعادل بین فعالیت آرام و پرتحرک ایجاد کنید → فعالیت‌های گروهی و فردی را ترکیب کنید → برنامه را در کلاس نصب کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "ایمنی و بهداشت کلاس",
                    "type": "activity",
                    "desc": "یادگیری اصول ایمنی کلاس",
                    "category": "مدیریت کلاس",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "چک‌لیست ایمنی",
                    "instructions": "کلاس را هر روز از نظر خطر بررسی کنید → وسایل خطرناک را دور از دسترس نگه دارید → کودکان را هنگام فعالیت‌های پرخطر تحت نظر بگیرید → آموزش CPR پایه ببینید",
                    "safety": "این آموزش جایگزین آموزش رسمی ایمنی نیست"
                  }
                ]
              }
            ]
          },
          {
            "title": "مسواک",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "ارزیابی رشد کودک",
                    "type": "activity",
                    "desc": "یادگیری ارزیابی رشدی ۵ حوزه",
                    "category": "ارزیابی رشد",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "فرم چک‌لیست",
                    "instructions": "حوزه‌های رشدی را بشناسید (حرکتی، شناختی، زبانی، اجتماعی، خلاقیت) → برای هر مهارت، سطح کودک را مشخص کنید → شواهد (مشاهده/نمونه‌کار) ثبت کنید → گزارش را با والد در میان بگذارید",
                    "safety": "ارزیابی باید بدون استرس کودک انجام شود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آگاهی واجی (آمادگی خواندن)",
                    "type": "activity",
                    "desc": "یادگیری تقویت آگاهی واجی در کودکان",
                    "category": "تکنیک تربیتی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "کتاب شعر",
                    "instructions": "شعر و قافیه برای کودک بخوانید → بازی‌های صدا (اولین صدای کلمه) انجام دهید → کلمات هم‌قافیه پیدا کنید → این تمرین‌ها را روزانه انجام دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "اتاق مربی — بخش 1 1 و اتاق مربی — بخش 1 2",
        "hotspots": [
          {
            "title": "اتاق مربی — بخش 1 1",
            "x": 26,
            "y": 52,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "فعالیت‌های حسی برای کودکان اوتیسم",
                    "type": "activity",
                    "desc": "تقویت پردازش حسی کودکان با اختلال طیف اوتیسم",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 5,
                    "duration": 20,
                    "materials": "خمیر بازی, جعبه حسی (شکر، برنج، لوبیا), توپ حسی",
                    "instructions": "اول سطح حساسیت حسی کودک را بشناسید (جستجوگر یا اجتناب‌کننده) → فعالیت‌های آرام‌کننده: فرو بردن دست در برنج/شکر → فعالیت‌های تقویتی: چسباندن برچسب، بازی با خمیر → بعد از هر فعالیت، وضعیت کودک را ثبت کنید",
                    "safety": "کودکان حسی-اجتنابی را مجبور به لمس نکنید، تدریجی پیش بروید"
                  },
                  {
                    "title": "مدیریت رفتار چالشی (خودآزاری/پرخاشگری)",
                    "type": "activity",
                    "desc": "یادگیری مدیریت رفتارهای چالشی کودکان با نیازهای ویژه",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "دفترچه ثبت رفتار",
                    "instructions": "علت رفتار (تریگر) را شناسایی کنید: درد؟ خستگی؟ تغییر محیط؟ → رفتار جایگزین مثبت را آموزش دهید (مثلاً بجای کوبیدن، دست‌ها را فشار دهد) → از روش ABC (Antecedent-Behavior-Consequence) استفاده کنید → هر تغییر مثبت را فوراً تقویت کنید",
                    "safety": "هرگز از فیزیکی (نگه داشتن شدید) استفاده نکنید مگر در موارد ایمنی"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "تقویت مهارت‌های حرکتی ظریف (کاردرمانی ساده)",
                    "type": "activity",
                    "desc": "تقویت مهارت‌های حرکتی ظریف کودکان با تاخیر حرکتی",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "مدادشمعی ضخیم, خانه‌سازی بزرگ, دکمه‌های بزرگ, نخ",
                    "instructions": "با مدادشمعی ضخیم، خط‌های ساده بکشید (خط صاف، دایره، ضربدر) → دکمه‌های بزرگ را با نخ رد کنید (مهارت رد کردن) → با خانه‌سازی، برج بسازید و بازی کنید → هر پیشرفتی را ثبت و جشن بگیرید",
                    "safety": "از اشیاء بزرگ استفاده کنید تا خطر بلعیدن وجود نداشته باشد"
                  },
                  {
                    "title": "گزارش پیشرفت کودکان استثنایی به والدین",
                    "type": "activity",
                    "desc": "نوشتن گزارش پیشرفت ویژه کودکان با نیازهای خاص",
                    "category": "کودکان استثنایی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "قالب گزارش ویژه, پرونده کودک",
                    "instructions": "اهداف IEP و درصد پیشرفت هر هدف را بنویسید → نمونه‌های عینی موفقیت را ذکر کنید → چالش‌های فعلی و پیشنهادات خانگی را بنویسید → گزارش را با والد مرور کنید و پاسخ سوالات آنها را بدهید",
                    "safety": "از زبان مثبت و امیدبخش استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "اتاق مربی — بخش 1 2",
            "x": 68,
            "y": 50,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "تقویت مهارت‌های اجتماعی کودکان استثنایی",
                    "type": "activity",
                    "desc": "آموزش مهارت‌های اجتماعی پایه به کودکان با نیازهای ویژه",
                    "category": "کودکان استثنایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کارت‌های اجتماعی (تصویری), عروسک",
                    "instructions": "با کارت‌های تصویری، موقعیت‌های اجتماعی را نشان دهید (سلام کردن، انتظار کشیدن، نوبت‌گرفتن) → با عروسک، موقعیت‌ها را نقش‌بازی کنید → رفتار صحیح را مدل‌سازی کنید و کودک تقلید کند → رفتار مثبت را فوراً تقویت کنید (تعریف، برچسب)",
                    "safety": "از کارت‌های ساده و واضح استفاده کنید، بدون متن زیاد"
                  },
                  {
                    "title": "ارتباط جایگزین (AAC) برای کودکان بی‌کلام",
                    "type": "activity",
                    "desc": "آشنایی با ابزارهای ارتباط جایگزین برای کودکان با تاخیر شدید زبانی",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "کارت‌های تصویری (PECS), تبلت/اپلیکیشن ساده",
                    "instructions": "کارت‌های تصویری نیازهای پایه (آب، غذا، توالت، بازی) را آماده کنید → هر بار کودک یک کارت را می‌گیرد و نشان می‌دهد، نیازش را برآورده کنید → تدریجاً کارت‌ها را اضافه کنید → از کودک بخواهید با اشاره یا انتخاب کارت، خواسته‌اش را بگوید",
                    "safety": "از ابزارهای ساده و بدون پیچیدگی استفاده کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "برنامه زمان‌بندی بصری (Visual Schedule)",
                    "type": "activity",
                    "desc": "کاهش اضطراب انتقال بین فعالیت‌ها با برنامه بصری",
                    "category": "کودکان استثنایی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "تصاویر فعالیت‌ها, تخته بزرگ, چسب",
                    "instructions": "تصاویر فعالیت‌های روزانه را به ترتیب زمانی بچینید → بعد از هر فعالیت، تصویر آن را بردارید یا علامت بزنید → کودک را تشویق کنید خودش تصویر بعدی را نگاه کند → تغییرات برنامه را از قبل با تصویر اعلام کنید",
                    "safety": "از تصاویر ساده و واضح استفاده کنید، نه متن"
                  },
                  {
                    "title": "فرم چک‌لیست رفتاری کودکان استثنایی",
                    "type": "activity",
                    "desc": "ثبت روزانه رفتارهای کودکان با نیازهای ویژه",
                    "category": "فرم‌های ارزیابی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "فرم چک‌لیست رفتاری, خودکار",
                    "instructions": "رفتارهای هدف (مثبت و چالشی) را با فرکانس ثبت کنید → تریگرها و زمینه رفتار را یادداشت کنید → استراتژی‌های موفق و ناموفق را ثبت کنید → هفتگی روند را تحلیل کنید و IEP را بازنگری کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "esterahat-moraabian",
    "folder": "esterahat-moraabian",
    "name": "استراحت مربیان",
    "icon": "☕",
    "heroPos": {
      "left": {
        "x": 15,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 50
      },
      "right": {
        "x": 80,
        "y": 50
      }
    },
    "views": {
      "herog": {
        "label": "هفتگی، ارزیابی، مواد و هماهنگی",
        "hotspots": [
          {
            "title": "هفتگی",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "هفتگی",
                "items": [
                  {
                    "title": "وقفه‌های کوتاه روزانه",
                    "type": "activity",
                    "desc": "جلوگیری از خستگی با وقفه‌های کوتاه",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 10,
                    "materials": "",
                    "instructions": "هر ۲ ساعت ۵ دقیقه وقفه بگیرید → از محل کار دور شوید → چند حرکت کششی انجام دهید → آب بنوشید",
                    "safety": ""
                  },
                  {
                    "title": "ذهن‌آگاهی برای کاهش استرس شغلی",
                    "type": "activity",
                    "category": "استراحت مربیان",
                    "audience": "مربی",
                    "source": "پرتال جامع علوم انسانی",
                    "desc": "آموزش کاهش استرس مبتنی بر ذهن‌آگاهی می‌تواند خستگی عاطفی مربیان را کاهش و عملکردشان را بهبود دهد."
                  }
                ]
              }
            ]
          },
          {
            "title": "ارزیابی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "ارزیابی",
                "items": [
                  {
                    "title": "جبران انرژی روزانه",
                    "type": "activity",
                    "desc": "بازیابی انرژی در طول روز",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 15,
                    "materials": "",
                    "instructions": "فعالیتی که شما را شارژ می‌کند مشخص کنید → هر روز زمانی برای آن بگذارید → می‌تواند پیاده‌روی، مطالعه یا موسیقی باشد → آن را جدی بگیرید",
                    "safety": ""
                  },
                  {
                    "title": "شناخت نشانه‌های فرسودگی شغلی",
                    "type": "activity",
                    "category": "استراحت مربیان",
                    "audience": "مربی",
                    "source": "سیویلیکا",
                    "desc": "کاهش انرژی، بی‌علاقگی به کار و غیبت مکرر از نشانه‌های اولیه‌ی فرسودگی شغلی‌اند."
                  }
                ]
              }
            ]
          },
          {
            "title": "مواد",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "مواد",
                "items": [
                  {
                    "title": "مدیریت خشم در لحظه",
                    "type": "activity",
                    "desc": "کنترل واکنش خشم در کلاس",
                    "category": "مدیریت استرس",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 5,
                    "materials": "",
                    "instructions": "وقتی عصبانی شدید، نفس عمیق بکشید → قبل از واکنش، سه شماره بشمارید → احساس خود را نام ببرید → با آرامش پاسخ دهید",
                    "safety": ""
                  },
                  {
                    "title": "مهارت‌های فردی مقابله با استرس",
                    "type": "activity",
                    "category": "استراحت مربیان",
                    "audience": "مربی",
                    "source": "سیویلیکا",
                    "desc": "مدیریت زمان، تقویت تاب‌آوری و حمایت روانی از راهکارهای مؤثر فردی برای مربیان است."
                  }
                ]
              }
            ]
          },
          {
            "title": "هماهنگی",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "هماهنگی",
                "items": [
                  {
                    "title": "مدیتیشن کوتاه قبل از کلاس",
                    "type": "activity",
                    "desc": "شروع آرام کلاس",
                    "category": "تکنیک آرام‌سازی سریع",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 5,
                    "materials": "",
                    "instructions": "چشمان‌تان را ببندید → روی تنفس تمرکز کنید → افکار را رها کنید → به آرامی چشم باز کنید و شروع کنید",
                    "safety": ""
                  },
                  {
                    "title": "صمیمیت با کودکان، کاهنده‌ی فرسودگی",
                    "type": "activity",
                    "category": "استراحت مربیان",
                    "audience": "مربی",
                    "source": "سامانه تراز",
                    "desc": "نزدیکی و صمیمیت مربی با کودکان کلاس، به‌مرور از استرس روزانه‌ی او می‌کاهد."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "چای، مطالعه، گفتگو و ورزش",
        "hotspots": [
          {
            "title": "چای",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "چای",
                "items": [
                  {
                    "title": "نفس عمیق ۴-۷-۸",
                    "type": "activity",
                    "desc": "کاهش استرس فوری با تنفس",
                    "category": "تکنیک آرام‌سازی سریع",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 5,
                    "materials": "",
                    "instructions": "۴ ثانیه از بینی نفس بکشید → ۷ ثانیه نگه دارید → ۸ ثانیه از دهان بیرون دهید → ۴ بار تکرار کنید",
                    "safety": "اگر احساس سرگیجه کردید، تنفس را عادی کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "مطالعه",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "مطالعه",
                "items": [
                  {
                    "title": "آرام‌سازی سریع در کلاس",
                    "type": "activity",
                    "desc": "بازیابی آرامش در لحظه",
                    "category": "تکنیک آرام‌سازی سریع",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 3,
                    "materials": "",
                    "instructions": "شانه‌ها را شل کنید → چند نفس عمیق بکشید → تا ۵ شماره را آرام بشمارید → با ذهن شفاف ادامه دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "گفتگو",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "گفتگو",
                "items": [
                  {
                    "title": "شناسایی نشانه‌های فرسودگی",
                    "type": "activity",
                    "desc": "آشنایی با نشانه‌های فرسودگی شغلی",
                    "category": "مدیریت استرس",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 10,
                    "materials": "",
                    "instructions": "نشانه‌ها را بشناسید (خستگی مداوم، بی‌انگیزگی، تحریک‌پذیری) → این نشانه‌ها را جدی بگیرید → در صورت تداوم، با مشاور صحبت کنید → مراقبت از خود را اولویت کنید",
                    "safety": "این محتوا آموزشی است و جایگزین مشاوره حرفه‌ای نیست"
                  }
                ]
              }
            ]
          },
          {
            "title": "ورزش",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "ورزش",
                "items": [
                  {
                    "title": "مرز بین کار و زندگی",
                    "type": "activity",
                    "desc": "ایجاد مرز سالم بین کار و زندگی",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 15,
                    "materials": "",
                    "instructions": "زمان پایان کار را مشخص کنید → بعد از کار، کار را رها کنید → پیام‌های کاری را در خانه محدود کنید → زمان شخصی برای خودتان بگذارید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "کارگاه، کتاب، وبینار و تبادل",
        "hotspots": [
          {
            "title": "کارگاه",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "کارگاه",
                "items": [
                  {
                    "title": "حمایت همکاران",
                    "type": "activity",
                    "desc": "استفاده از حمایت همکاران",
                    "category": "مدیریت استرس",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 15,
                    "materials": "",
                    "instructions": "با همکاران درباره چالش‌ها گفتگو کنید → تجربیات موفق را به اشتراک بگذارید → از همکاران کمک بخواهید → فضای حمایتی ایجاد کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "کتاب",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "کتاب",
                "items": [
                  {
                    "title": "بازبینی پایان روز",
                    "type": "activity",
                    "desc": "مرور و بستن روز کاری",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 10,
                    "materials": "",
                    "instructions": "سه موفقیت امروز را بنویسید → یک درس یادگرفته بنویسید → کارهای ناتمام را برای فردا یادداشت کنید → روز را با آرامش ببندید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "وبینار",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "وبینار",
                "items": [
                  {
                    "title": "تغذیه مربی",
                    "type": "activity",
                    "desc": "حفظ انرژی با تغذیه مناسب",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 10,
                    "materials": "",
                    "instructions": "صبحانه کامل بخورید → میان‌وعده سالم همراه داشته باشید → آب کافی بنوشید → کافئین را محدود کنید",
                    "safety": "این محتوا آموزشی عمومی است، نه توصیه پزشکی"
                  }
                ]
              }
            ]
          },
          {
            "title": "تبادل",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "تبادل",
                "items": [
                  {
                    "title": "استراحت واقعی",
                    "type": "activity",
                    "desc": "یادگیری استراحت واقعی",
                    "category": "خودمراقبتی",
                    "ageMin": 0,
                    "ageMax": 0,
                    "duration": 15,
                    "materials": "",
                    "instructions": "تفاوت استراحت و بیکاری را بشناسید → کاری که شما را آرام می‌کند انجام دهید → بدون موبایل استراحت کنید → خواب کافی قربانی نشود",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "jalase-owlia",
    "folder": "jalase-owlia",
    "name": "جلسه اولیا",
    "icon": "👨‍👩‍👧",
    "heroPos": {
      "left": {
        "x": 15,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 55
      },
      "right": {
        "x": 80,
        "y": 50
      }
    },
    "views": {
      "herog": {
        "label": "احساسات، دوستی، ترس و خودباوری",
        "hotspots": [
          {
            "title": "احساسات",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "احساسات",
                "items": [
                  {
                    "title": "ارتباط با مهدکودک",
                    "type": "activity",
                    "desc": "یادگیری ارتباط موثر با مهدکودک",
                    "category": "ارتباط والد-مهد",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "در جلسات اولیا شرکت کنید → نگرانی‌های خود را با مربی در میان بگذارید → گزارش‌های مربی را دنبال کنید → در برنامه‌های مهد مشارکت کنید",
                    "safety": ""
                  },
                  {
                    "title": "ساختار پیشنهادی جلسه‌ی اولیا",
                    "type": "activity",
                    "category": "جلسه اولیا",
                    "audience": "مربی",
                    "source": "آلامتو",
                    "desc": "خوش‌آمدگویی، بیان هدف جلسه، گزارش نقاط قوت و پیشنهاد بهبود از اجزای یک جلسه‌ی مؤثر با والدین است."
                  }
                ]
              }
            ]
          },
          {
            "title": "دوستی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "دوستی",
                "items": [
                  {
                    "title": "موضوع جلسه: آمادگی برای پیش‌دبستانی",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره آمادگی کودک برای پیش‌دبستانی",
                    "category": "موضوع جلسه",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "دستور جلسه",
                    "instructions": "مهارت‌های لازم برای پیش‌دبستانی را معرفی کنید → نقش والد در آمادگی کودک را توضیح دهید → به سوالات والد پاسخ دهید → برنامه عملی پیشنهاد دهید",
                    "safety": ""
                  },
                  {
                    "title": "سوالاتی که والدین می‌توانند بپرسند",
                    "type": "activity",
                    "category": "جلسه اولیا",
                    "audience": "مربی",
                    "source": "منتابلاگ",
                    "desc": "پرسش درباره‌ی نقاط قوت، چالش‌ها و استعدادهای شناسایی‌شده‌ی فرزند، جلسه را مؤثرتر می‌کند."
                  }
                ]
              }
            ]
          },
          {
            "title": "ترس",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "ترس",
                "items": [
                  {
                    "title": "موضوع جلسه: تغذیه سالم",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره تغذیه سالم کودک",
                    "category": "موضوع جلسه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "بروشور تغذیه",
                    "instructions": "اصول تغذیه سالم کودک را معرفی کنید → نمونه برنامه غذایی بدهید → به چالش‌های رایج پاسخ دهید → دستورالعمل عملی ارائه دهید",
                    "safety": "محتوای آموزشی عمومی است، نه توصیه پزشکی"
                  },
                  {
                    "title": "کانال‌های ارتباطی مستمر با والدین",
                    "type": "activity",
                    "category": "جلسه اولیا",
                    "audience": "مربی",
                    "source": "آلامتو",
                    "desc": "خبرنامه، ایمیل یا پورتال والدین راهی برای آگاه نگه‌داشتن مداوم خانواده از وضعیت کودک است."
                  }
                ]
              }
            ]
          },
          {
            "title": "خودباوری",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "خودباوری",
                "items": [
                  {
                    "title": "موضوع جلسه: مدیریت رفتار",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره مدیریت رفتار کودک",
                    "category": "موضوع جلسه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "دستور جلسه",
                    "instructions": "علل رفتارهای چالش‌برانگیز را توضیح دهید → راهکارهای عملی ارائه دهید → تجربیات والدین را به اشتراک بگذارید → برنامه مشترک خانه و مهد تنظیم کنید",
                    "safety": ""
                  },
                  {
                    "title": "تشویق مشارکت والدین در برنامه‌های مهد",
                    "type": "activity",
                    "category": "جلسه اولیا",
                    "audience": "مربی",
                    "source": "مدرسه‌ها",
                    "desc": "دعوت والدین به همکاری در پروژه‌ها و برنامه‌های مهدکودک، پیوند خانه و مهد را تقویت می‌کند."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "چای، مطالعه، گفتگو و ورزش",
        "hotspots": [
          {
            "title": "چای",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "چای",
                "items": [
                  {
                    "title": "فرزندپروری بدون تنبیه",
                    "type": "activity",
                    "desc": "آشنایی والد با روش‌های فرزندپروری بدون تنبیه",
                    "category": "فرزندپروری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "به جای تنبیه، علت رفتار را بررسی کنید → از هدایت مثبت استفاده کنید → پیامدهای طبیعی و منطقی به کار بگیرید → احساسات خودتان را مدیریت کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "مطالعه",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "مطالعه",
                "items": [
                  {
                    "title": "مرزهای سالم",
                    "type": "activity",
                    "desc": "یادگیری تعیین مرزهای سالم برای کودک",
                    "category": "فرزندپروری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "قوانین ساده و مشخص تعیین کنید → قوانین را با مهربانی و قاطعیت اجرا کنید → پیامدها را از قبل اعلام کنید → در اجرای قوانین ثابت قدم باشید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "گفتگو",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "گفتگو",
                "items": [
                  {
                    "title": "زمان با کیفیت",
                    "type": "activity",
                    "desc": "یادگیری گذراندن زمان با کیفیت با کودک",
                    "category": "فرزندپروری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "هر روز ۱۵ دقیقه زمان اختصاصی برای کودک بگذارید → در این زمان، فقط با کودک باشید → بازی مورد علاقه کودک را انجام دهید → موبایل را کنار بگذارید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "ورزش",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "ورزش",
                "items": [
                  {
                    "title": "گفتگو درباره احساسات",
                    "type": "activity",
                    "desc": "یادگیری گفتگو با کودک درباره احساسات",
                    "category": "فرزندپروری",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "احساسات کودک را نام‌گذاری کنید → احساسات کودک را تأیید کنید → راه‌های سالم ابراز احساسات را نشان دهید → وقتی کودک عصبانی است، آرام بمانید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "رشد، تحصیلی، گزارش و برنامه فردی",
        "hotspots": [
          {
            "title": "رشد",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "رشد",
                "items": [
                  {
                    "title": "موضوع جلسه: خواب کودک",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره خواب کودک",
                    "category": "موضوع جلسه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "بروشور خواب",
                    "instructions": "اهمیت خواب را توضیح دهید → برنامه خواب منظم پیشنهاد دهید → آیین خواب (قصه، لالایی) معرفی کنید → به مشکلات رایج خواب پاسخ دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "تحصیلی",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "تحصیلی",
                "items": [
                  {
                    "title": "موضوع جلسه: بازی و یادگیری",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره نقش بازی در یادگیری",
                    "category": "موضوع جلسه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "نمونه بازی‌ها",
                    "instructions": "نقش بازی در رشد کودک را توضیح دهید → بازی‌های آموزشی معرفی کنید → نحوه مشارکت والد در بازی را نشان دهید → به سوالات پاسخ دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "گزارش",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "گزارش",
                "items": [
                  {
                    "title": "موضوع جلسه: ایمنی کودک در خانه",
                    "type": "activity",
                    "desc": "برگزاری جلسه درباره ایمنی کودک در خانه",
                    "category": "موضوع جلسه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "چک‌لیست ایمنی",
                    "instructions": "نقاط خطرناک خانه را شناسایی کنید → راه‌های ایمن‌سازی خانه را آموزش دهید → اصول ایمنی بدن به کودک را توضیح دهید → شماره‌های اضطراری را معرفی کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "برنامه فردی",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "برنامه فردی",
                "items": [
                  {
                    "title": "همکاری خانه و مهد",
                    "type": "activity",
                    "desc": "یادگیری همکاری موثر خانه و مهد",
                    "category": "ارتباط والد-مهد",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "",
                    "instructions": "برنامه‌های مهد را در خانه ادامه دهید → درباره پیشرفت کودک با مربی گفتگو کنید → در رویدادهای مهد شرکت کنید → بازخورد به مربی بدهید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "bayegani",
    "folder": "bayegani",
    "name": "بایگانی",
    "icon": "🗄️",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 55
      },
      "right": {
        "x": 85,
        "y": 48
      }
    },
    "views": {
      "herog": {
        "label": "ثبت‌نام، گزارش، برنامه و ارزیابی",
        "hotspots": [
          {
            "title": "ثبت‌نام",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کارت‌های تصویری میوه‌ها",
                    "type": "activity",
                    "desc": "شناخت میوه‌ها از طریق کارت",
                    "category": "کاربرگ چاپی",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, قیچی",
                    "instructions": "کارت‌های میوه‌ها را چاپ کنید → کارت‌ها را برش دهید → نام میوه‌ها را تمرین کنید → بازی دسته‌بندی میوه‌ها انجام دهید",
                    "safety": "برش با کمک بزرگسال انجام شود"
                  },
                  {
                    "title": "فرم ارزیابی ورودی (پیش‌آزمون)",
                    "type": "activity",
                    "desc": "ارزیابی سطح اولیه رشد کودک در ۵ حوزه",
                    "category": "فرم‌های ارزیابی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "فرم چاپی ارزیابی, خودکار, اسباب‌بازی‌های تشخیصی",
                    "instructions": "در محیطی آرام با کودک بازی کنید → هر حوزه رشدی را با فعالیت‌های بازیگوشانه بسنجید → سطح کودک را در مقیاس در حال ظهور/در حال رشد/تثبیت‌شده ثبت کنید → نتایج را با والد در میان بگذارید",
                    "safety": "ارزیابی باید بدون استرس کودک و در قالب بازی انجام شود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم چک‌لیست ارزیابی ۵ حوزه رشد",
                    "type": "activity",
                    "desc": "ارزیابی دوره‌ای رشد در ۵ حوزه (حرکتی، شناختی، زبانی، اجتماعی، خلاقیت)",
                    "category": "فرم‌های ارزیابی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "فرم چک‌لیست چاپی, خودکار, پرونده کودک",
                    "instructions": "برای هر حوزه، مهارت‌ها را یکی‌یکی بررسی کنید → سطح کودک را (در حال ظهور/در حال رشد/تثبیت‌شده) علامت بزنید → شواهد مشاهده‌ای را یادداشت کنید → چک‌لیست را در پرونده کودک بایگانی کنید",
                    "safety": "ارزیابی دوره‌ای باید هر ۳ ماه انجام شود"
                  }
                ]
              }
            ]
          },
          {
            "title": "گزارش",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "برنامه هفتگی تصویری",
                    "type": "activity",
                    "desc": "آشنایی با برنامه هفتگی",
                    "category": "کاربرگ چاپی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, برچسب",
                    "instructions": "برنامه هفتگی را چاپ کنید → فعالیت‌ها را با کودک مرور کنید → بعد از هر فعالیت، برچسب بزنید → در پایان هفته برنامه را مرور کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم پیگیری وضعیت ساعتی کودک",
                    "type": "activity",
                    "desc": "ثبت وضعیت ساعتی کودک (تغذیه، خواب، فعالیت، احساس) برای ارتباط مربی-مدیر-والد",
                    "category": "فرم‌های روزانه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "فرم چاپی ساعتی, خودکار",
                    "instructions": "هر ساعت وضعیت کودک را در ستون مربوطه ثبت کنید → تغذیه: چه خورد و چقدر؟ → خواب: چه زمانی خوابید و بیدار شد؟ → احساس/رفتار: آرام، فعال، بی‌قرار، نیازمند توجه؟ → در پایان روز، خلاصه را به والد تحویل دهید",
                    "safety": "مشاهده‌ها باید دقیق و بدون قضاوت ثبت شوند"
                  }
                ]
              }
            ]
          },
          {
            "title": "برنامه",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "دفترچه احساسات",
                    "type": "activity",
                    "desc": "ثبت و شناخت احساسات",
                    "category": "آلبوم کار",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, مداد رنگی",
                    "instructions": "صفحات چهره‌های احساسی را چاپ کنید → هر روز کودک احساسش را رنگ کند → درباره احساس صحبت کنید → دفترچه را در آلبوم نگهداری کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم گزارش روزانه به والد",
                    "type": "activity",
                    "desc": "گزارش خلاصه روز کودک به والد",
                    "category": "فرم‌های روزانه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "فرم چاپی روزانه, خودکار",
                    "instructions": "فعالیت‌های اصلی روز را خلاصه کنید → وضعیت تغذیه، خواب و دستشویی را ثبت کنید → یک لحظه خوش و یک چالش را بنویسید → امضا و تاریخ بزنید و به والد تحویل دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "ارزیابی",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "فرم ثبت‌نام کودک",
                    "type": "activity",
                    "desc": "ثبت اطلاعات پایه کودک در بدو ورود به مهد",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "فرم چاپی ثبت‌نام, خودکار",
                    "instructions": "اطلاعات شناسنامه‌ای کودک و والد را وارد کنید → سوابق پزشکی و حساسیت‌ها را ثبت کنید → اطلاعات اضطراری و شماره تماس والد را کامل کنید → رضایت‌نامه‌های لازم (عکس، فعالیت) را امضا بگیرید",
                    "safety": "این فرم حاوی اطلاعات محرمانه است و باید در بایگانی قفل نگهداری شود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم گزارش هفتگی رشد و احساس",
                    "type": "activity",
                    "desc": "ثبت خلاصه هفتگی رشد و وضعیت عاطفی کودک",
                    "category": "فرم‌های ارزیابی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "فرم چاپی هفتگی, خودکار",
                    "instructions": "در پایان هر هفته، پیشرفت حوزه‌های رشدی را مرور کنید → وضعیت عاطفی-اجتماعی کودک را توصیف کنید → علایق و نکات جدید کودک را ثبت کنید → یک هدف برای هفته بعد تعیین کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "تربیت، ارتباط، رفتار و مدرسه",
        "hotspots": [
          {
            "title": "تربیت",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کاربرگ رنگ‌آمیزی فصل‌ها",
                    "type": "activity",
                    "desc": "شناخت فصل‌ها از طریق رنگ‌آمیزی",
                    "category": "کاربرگ چاپی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, مداد رنگی",
                    "instructions": "کاربرگ را چاپ کنید → تصویر فصل مورد نظر را رنگ کنید → ویژگی‌های فصل را با هم مرور کنید → کار را در آلبوم نگهداری کنید",
                    "safety": ""
                  },
                  {
                    "title": "گواهی مشارکت",
                    "type": "activity",
                    "desc": "قدردانی و تشویق کودک",
                    "category": "گواهی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "پرینتر, کاغذ",
                    "instructions": "قالب گواهی را چاپ کنید → نام کودک را بنویسید → امضا کنید → به کودک تقدیم کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "کارت‌های تصویری حیوانات",
                    "type": "activity",
                    "desc": "شناخت حیوانات از طریق کارت",
                    "category": "کاربرگ چاپی",
                    "ageMin": 2,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, قیچی",
                    "instructions": "کارت‌های حیوانات را چاپ کنید → کارت‌ها را برش دهید → نام و صدای حیوان را تمرین کنید → بازی حافظه با کارت‌ها انجام دهید",
                    "safety": "برش با کمک بزرگسال انجام شود"
                  }
                ]
              }
            ]
          },
          {
            "title": "ارتباط",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کاربرگ ردیابی حروف الفبا",
                    "type": "activity",
                    "desc": "تمرین نوشتن حروف الفبا",
                    "category": "کاربرگ چاپی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "پرینتر, کاغذ, مداد",
                    "instructions": "کاربرگ نقطه‌چین را چاپ کنید → با انگشت روی حرف ردیابی کنید → با مداد حرف را بنویسید → هر روز یک حرف تمرین کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "گواهی پایان دوره",
                    "type": "activity",
                    "desc": "ثبت دستاورد کودک",
                    "category": "گواهی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "پرینتر, کاغذ",
                    "instructions": "قالب گواهی پایان دوره را چاپ کنید → نام کودک و دوره را بنویسید → مربی و مدیر امضا کنند → در آلبوم کودک نگهداری کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "رفتار",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کاربرگ شمارش اعداد",
                    "type": "activity",
                    "desc": "تمرین شمارش و شناخت اعداد",
                    "category": "کاربرگ چاپی",
                    "ageMin": 3,
                    "ageMax": 5,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, مداد",
                    "instructions": "کاربرگ شمارش را چاپ کنید → اشیاء تصویر را بشمارید → عدد را بنویسید → با هم بررسی کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آلبوم نقاشی‌های من",
                    "type": "activity",
                    "desc": "ثبت و نگهداری آثار هنری کودک",
                    "category": "آلبوم کار",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "پوشه, نقاشی‌ها",
                    "instructions": "یک پوشه برای آثار کودک تهیه کنید → هر نقاشی را با تاریخ ثبت کنید → آثار را در پوشه مرتب کنید → هر ماه مرور کنید و پیشرفت را نشان دهید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "مدرسه",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کاربرگ الگوها",
                    "type": "activity",
                    "desc": "تقویت درک الگو و دنباله",
                    "category": "کاربرگ چاپی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "پرینتر, کاغذ, مداد رنگی",
                    "instructions": "کاربرگ الگو را چاپ کنید → الگو را تشخیص دهید → دنباله را ادامه دهید → الگوی خودتان بسازید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "کارنامه تصویری رشد",
                    "type": "activity",
                    "desc": "ثبت تصویری پیشرفت کودک",
                    "category": "آلبوم کار",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "دوربین, پرینتر, آلبوم",
                    "instructions": "از لحظه‌های مهم کودک عکس بگیرید → عکس‌ها را چاپ کنید → در آلبوم با تاریخ ثبت کنید → در پایان دوره به والد تقدیم کنید",
                    "safety": "با رضایت والدین از کودک عکس بگیرید"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "بایگانی — بخش 1 1 و بایگانی — بخش 1 2",
        "hotspots": [
          {
            "title": "بایگانی — بخش 1 1",
            "x": 26,
            "y": 52,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "فرم انتقال اطلاعات بین مربیان (تحویل شیفت)",
                    "type": "activity",
                    "desc": "انتقال دقیق اطلاعات وضعیت کودک بین مربیان شیفت‌های مختلف",
                    "category": "فرم‌های روزانه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "فرم چاپی تحویل شیفت, خودکار",
                    "instructions": "در پایان هر شیفت، وضعیت هر کودک را خلاصه کنید → تغذیه، خواب، دارو و رفتارهای مهم را منتقل کنید → نکات ایمنی و هشدارها را برجسته کنید → فرم را در جلسه تحویل شیفت مرور کنید",
                    "safety": "این فرم برای ایمنی کودک حیاتی است و نباید ناقص پر شود"
                  },
                  {
                    "title": "فرم رضایت‌نامه والدین",
                    "type": "activity",
                    "desc": "اخذ رضایت کتبی والد برای فعالیت‌های مختلف",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "فرم رضایت‌نامه چاپی, خودکار",
                    "instructions": "نوع فعالیت (عکس، گردش، فعالیت خاص) را مشخص کنید → توضیحات کامل فعالیت را بنویسید → امضای والد را بگیرید → فرم را در پرونده کودک بایگانی کنید",
                    "safety": "بدون رضایت کتبی، هیچ فعالیت خارج از برنامه نباید انجام شود"
                  },
                  {
                    "title": "فرم پیگیری وضعیت ساعتی (نسخه مدیر)",
                    "type": "activity",
                    "desc": "نظارت مدیریتی بر وضعیت ساعتی کودکان بین مدیر و مربیان",
                    "category": "فرم‌های روزانه",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "فرم چاپی مدیریتی, خودکار",
                    "instructions": "مدیر در بازدیدهای ساعتی، وضعیت هر کلاس را ثبت کند → تعداد کودکان حاضر، وضعیت مربیان و نظم کلاس را ثبت کنید → موارد نیازمند اقدام را یادداشت کنید → در جلسه روزانه با مربیان مرور کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم برنامه روزانه کلاس",
                    "type": "activity",
                    "desc": "ثبت و هماهنگی برنامه روزانه کلاس بین مربی و مدیر",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "فرم برنامه روزانه, خودکار",
                    "instructions": "زمان‌بندی فعالیت‌ها را ثبت کنید (ورود، بازی آزاد، صبحانه، فعالیت محوری، حیاط، ناهار، خواب، خروج) → مسئول هر بخش را مشخص کنید → تغییرات برنامه را یادداشت کنید → برنامه را در کلاس و اتاق مدیر نصب کنید",
                    "safety": ""
                  },
                  {
                    "title": "فرم جلسه اولیا و مربیان",
                    "type": "activity",
                    "desc": "ثبت مصوبات جلسه اولیا و مربیان",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "فرم صورت‌جلسه, خودکار",
                    "instructions": "دستور جلسه را قبل از جلسه اعلام کنید → در طول جلسه نکات کلیدی را یادداشت کنید → مصوبات و مسئول‌های هر اقدام را ثبت کنید → صورت‌جلسه را در بایگانی نگهداری و به اولیا ارسال کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "بایگانی — بخش 1 2",
            "x": 68,
            "y": 50,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "فرم پیام مربی به والد (دفتر ارتباط)",
                    "type": "activity",
                    "desc": "برقراری ارتباط دوطرفه و مستند مربی-والد",
                    "category": "فرم‌های ارتباطی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "دفترچه ارتباط, خودکار",
                    "instructions": "پیام مربی: خبر خوش، نکته، سوال از والد → پیام والد: پاسخ، نگرانی، درخواست → تاریخ و امضای هر دو طرف → دفترچه را هر روز بین مربی و والد جابه‌جا کنید",
                    "safety": ""
                  },
                  {
                    "title": "فرم معرفی به متخصص (گفتار/کاردرمانی)",
                    "type": "activity",
                    "desc": "مستندسازی ارجاع کودک به متخصص",
                    "category": "فرم‌های ارزیابی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "فرم ارجاع چاپی, خودکار, گزارش‌های مشاهده",
                    "instructions": "علت ارجاع را دقیق توصیف کنید (با مثال‌های مشاهده) → سوابق و گزارش‌های قبلی را ضمیمه کنید → با والد گفتگو کنید و رضایت بگیرید → فرم را به مرکز تخصصی ارسال کنید و پیگیری کنید",
                    "safety": "ارجاع باید محترمانه و بدون برچسب زدن به کودک انجام شود"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "فرم گزارش ماهانه به مدیر",
                    "type": "activity",
                    "desc": "گزارش جامع ماهانه وضعیت کلاس به مدیر",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "فرم گزارش ماهانه, خودکار, آمار ماه",
                    "instructions": "حضور و غیاب ماهانه را خلاصه کنید → فعالیت‌های اجراشده و دستاوردها را لیست کنید → چالش‌ها و نیازهای کلاس را گزارش دهید → پیشنهادات بهبود را بنویسید",
                    "safety": ""
                  },
                  {
                    "title": "فرم چک‌لیست ایمنی و بهداشت روزانه",
                    "type": "activity",
                    "desc": "بررسی روزانه ایمنی و بهداشت فضای مهد",
                    "category": "فرم‌های اداری",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "فرم چک‌لیست, خودکار",
                    "instructions": "هر روز صبح قبل از ورود کودکان، فضای کلاس و حیاط را بررسی کنید → وسایل خطرناک، شکسته یا ناایمن را ثبت و رفع کنید → بهداشت دستشویی و سرویس‌ها را چک کنید → در پایان ماه، موارد تکرارشونده را تحلیل کنید",
                    "safety": "این چک‌لیست برای پیشگیری از حادثه حیاتی است"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "teria",
    "folder": "teria",
    "name": "تریا",
    "icon": "🍽️",
    "heroPos": {
      "left": {
        "x": 15,
        "y": 55
      },
      "center": {
        "x": 50,
        "y": 55
      },
      "right": {
        "x": 80,
        "y": 50
      }
    },
    "views": {
      "herog": {
        "label": "سالانه، هفتگی، مناسبت و بازدید",
        "hotspots": [
          {
            "title": "سالانه",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "بازی حدس میوه با چشم بسته",
                    "type": "activity",
                    "desc": "شناخت میوه از طریق لامسه و بویایی",
                    "category": "بازی غذایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "میوه‌های متنوع, دستمال چشم",
                    "instructions": "چشم کودک را ببندید → میوه‌ای به دستش بدهید → از کودک بخواهید حدس بزند چیست → با تشویق پاسخ دهید",
                    "safety": "میوه را خوب بشویید و برش دهید"
                  },
                  {
                    "title": "صبحانه‌ی یکسان و فصلی برای همه",
                    "type": "activity",
                    "category": "تریا",
                    "audience": "مربی",
                    "source": "بیتوته",
                    "desc": "هماهنگ‌بودن صبحانه‌ی کودکان در مهد باعث می‌شود بدون رقابت بر سر غذای هم، وعده‌ی خودشان را کامل بخورند."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "غذای رنگارنگ",
                    "type": "activity",
                    "desc": "ترغیب به خوردن تنوع غذایی",
                    "category": "عادت غذایی سالم",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "غذاهای رنگی",
                    "instructions": "غذاهای رنگی مختلف را نشان دهید → هر رنگ را با یک غذا ارتباط دهید → از کودک بخواهید از هر رنگ بخورد → تنوع را تشویق کنید",
                    "safety": "این آموزش عمومی است، نه توصیه پزشکی"
                  }
                ]
              }
            ]
          },
          {
            "title": "هفتگی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "هفتگی",
                "items": [
                  {
                    "title": "ساخت میان‌وعده میوه‌ای",
                    "type": "activity",
                    "desc": "مشارکت کودک در آماده‌سازی غذا",
                    "category": "بازی غذایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "میوه, ظرف, چنگال",
                    "instructions": "میوه‌ها را بشویید → از کودک بخواهید میوه‌ها را در ظرف بچیند → ساخت میان‌وعده را با هم انجام دهید → میان‌وعده را با هم میل کنید",
                    "safety": "برش میوه با کمک بزرگسال انجام شود"
                  },
                  {
                    "title": "میان‌وعده‌ی سالم بین وعده‌های اصلی",
                    "type": "activity",
                    "category": "تریا",
                    "audience": "مربی",
                    "source": "نی‌نی‌بان",
                    "desc": "میان‌وعده باید از غلات کامل، میوه و سبزیجات تشکیل شود تا اشتهای کودک برای غذای اصلی کم نشود."
                  }
                ]
              }
            ]
          },
          {
            "title": "مناسبت",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "مناسبت",
                "items": [
                  {
                    "title": "نوشیدن آب",
                    "type": "activity",
                    "desc": "عادت به نوشیدن آب",
                    "category": "عادت غذایی سالم",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "لیوان آب",
                    "instructions": "درباره اهمیت آب صحبت کنید → لیوان آب به کودک بدهید → در طول روز آب بدهید → به جای نوشابه آب بنوشید",
                    "safety": ""
                  },
                  {
                    "title": "اهمیت پروتئین در رشد کودک",
                    "type": "activity",
                    "category": "تریا",
                    "audience": "مربی",
                    "source": "matyar-solaleh",
                    "desc": "منابع پروتئینی مثل تخم‌مرغ، حبوبات و گوشت برای رشد عضلانی و تأمین انرژی کودک ضروری‌اند."
                  }
                ]
              }
            ]
          },
          {
            "title": "بازدید",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "بازدید",
                "items": [
                  {
                    "title": "جویدن کامل غذا",
                    "type": "activity",
                    "desc": "یادگیری جویدن کامل و آرام غذا",
                    "category": "عادت غذایی سالم",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "",
                    "instructions": "به کودک نشان دهید چگونه آرام می‌جود → از او بخواهید حبوبات را خوب بجود → سرعت غذا خوردن را کم کنید → با هم آرام غذا بخورید",
                    "safety": ""
                  },
                  {
                    "title": "برنامه‌ریزی وعده‌های غذایی در کودکستان",
                    "type": "activity",
                    "category": "تریا",
                    "audience": "مربی",
                    "source": "matyar-solaleh",
                    "desc": "برنامه‌ریزی منظم وعده‌ها تضمین می‌کند کودک ویتامین‌ها و مواد معدنی کافی دریافت کند."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "ثبت‌نام، بودجه، پرسنل و تماس",
        "hotspots": [
          {
            "title": "ثبت‌نام",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "آشنایی با میوه‌ها",
                    "type": "activity",
                    "desc": "شناخت میوه‌های مختلف",
                    "category": "آشنایی با میوه و سبزی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "میوه‌های متنوع",
                    "instructions": "میوه‌های مختلف را روی میز بگذارید → نام هر میوه را بگویید → از کودک بخواهید میوه را لمس کند → با هم میوه را میل کنید",
                    "safety": "میوه را به قطعات کوچک برش دهید تا خطر خفگی نداشته باشد"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "بشقاب سالم",
                    "type": "activity",
                    "desc": "چیدن بشقاب سالم و متنوع",
                    "category": "بازی غذایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "بشقاب, تصاویر غذاها",
                    "instructions": "تصاویر غذاها را نشان دهید → از کودک بخواهید بشقاب سالم بچیند → درباره گروه‌های غذایی صحبت کنید → با هم بشقاب واقعی درست کنید",
                    "safety": "این آموزش عمومی است، نه توصیه تغذیه‌ای پزشکی"
                  }
                ]
              }
            ]
          },
          {
            "title": "بودجه",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "بودجه",
                "items": [
                  {
                    "title": "آشنایی با سبزیجات",
                    "type": "activity",
                    "desc": "شناخت سبزیجات مختلف",
                    "category": "آشنایی با میوه و سبزی",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "سبزیجات متنوع",
                    "instructions": "سبزیجات مختلف را نشان دهید → نام هر سبزی را بگویید → رنگ و شکل را با هم ببینید → سبزی را در وعده غذایی بگنجانید",
                    "safety": "سبزیجات را خوب بشویید و برش دهید"
                  }
                ]
              }
            ]
          },
          {
            "title": "پرسنل",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "پرسنل",
                "items": [
                  {
                    "title": "شستن دست قبل از غذا",
                    "type": "activity",
                    "desc": "یادگیری شستن دست قبل از غذا",
                    "category": "آداب غذا",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 10,
                    "materials": "آب, صابون, دستمال",
                    "instructions": "قبل از غذا دست‌ها را بشویید → از کودک بخواهید همراهی کند → مراحل شستن را تکرار کنید → فقط پس از شستن دست سر غذا بنشینید",
                    "safety": "دمای آب را کنترل کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "تماس",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "تماس",
                "items": [
                  {
                    "title": "آداب سفره",
                    "type": "activity",
                    "desc": "یادگیری آداب سر سفره",
                    "category": "آداب غذا",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "سفره, ظروف",
                    "instructions": "سر سفره نشستن را تمرین کنید → جویدن کامل و آرام غذا را آموزش دهید → تشکر بعد از غذا را تمرین کنید → با هم سر سفره بنشینید",
                    "safety": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "پیام، جلسات، همکاری و تبلیغات",
        "hotspots": [
          {
            "title": "پیام",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "تشکر بعد از غذا",
                    "type": "activity",
                    "desc": "یادگیری تشکر بعد از غذا",
                    "category": "آداب غذا",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 5,
                    "materials": "",
                    "instructions": "بعد از غذا، تشکر کردن را تمرین کنید → فرمول تشکر را ساده نگه دارید → به کودک یاد دهید سفره را مرتب کند → این عادت را هر روز تکرار کنید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آشپزی ساده: ساندویچ میوه",
                    "type": "activity",
                    "desc": "مشارکت کودک در تهیه یک خوراکی ساده و سالم",
                    "category": "آشپزی ساده",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "نان تست, موز, توت‌فرنگی, کره بادام‌زمینی, چاقوی پلاستیکی, بشقاب",
                    "instructions": "مواد را بشویید و آماده کنید → با چاقوی پلاستیکی، موز را به حلقه‌های ضخیم برش دهید (با کمک بزرگسال) → روی نان، کره بادام‌زمینی بمالید → حلقه‌های موز و توت‌فرنگی را روی نان بچینید → ساندویچ را با هم میل کنید و درباره طعم‌ها صحبت کنید",
                    "safety": "برش با چاقوی پلاستیکی و تحت نظارت بزرگسال. از مواد بدون آلرژی مطمئن شوید"
                  }
                ]
              }
            ]
          },
          {
            "title": "جلسات",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "بازی طبقه‌بندی میوه و سبزی",
                    "type": "activity",
                    "desc": "تقویت طبقه‌بندی و شناخت",
                    "category": "بازی غذایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "تصاویر میوه و سبزی",
                    "instructions": "تصاویر میوه و سبزی را مخلوط کنید → از کودک بخواهید دسته‌بندی کند → نام هر دسته را بگویید → با تشویق پاسخ دهید",
                    "safety": ""
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "آشپزی ساده: بستنی میوه‌ای خانگی",
                    "type": "activity",
                    "desc": "ساخت بستنی سالم با میوه‌های یخ‌زده",
                    "category": "آشپزی ساده",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "موز یخ‌زده, توت‌فرنگی یخ‌زده, میکسر, کاسه, قاشق",
                    "instructions": "میوه‌های یخ‌زده را در میکسر بریزید → با کمک بزرگسال، میکسر را روشن کنید → بستنی خامه‌ای را در کاسه بریزید → با میوه تازه تزئین کنید و میل کنید",
                    "safety": "میکسر فقط توسط بزرگسال. از میوه‌های بدون هسته استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "همکاری",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "همکاری",
                "items": [
                  {
                    "title": "معرفی طعم‌های مختلف",
                    "type": "activity",
                    "desc": "آشنایی با طعم‌های شیرین، ترش، شور",
                    "category": "بازی غذایی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "مواد غذایی با طعم‌های مختلف",
                    "instructions": "مواد غذایی با طعم‌های مختلف آماده کنید → از کودک بخواهید هر طعم را بچشد → نام طعم را بگویید → درباره طعم‌ها صحبت کنید",
                    "safety": "از مواد امن و بدون خطر آلرژی استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "تبلیغات",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "تبلیغات",
                "items": [
                  {
                    "title": "داستان غذاها",
                    "type": "activity",
                    "desc": "مشارکت کودک در آشپزی و علاقه به غذا",
                    "category": "عادت غذایی سالم",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "مواد غذایی",
                    "instructions": "داستانی درباره غذا تعریف کنید (مثلاً هویج کجا رشد می‌کند) → به کودک نشان دهید غذا از کجا می‌آید → پخت و پز را نمایش دهید → کودک را در آماده‌سازی مشارکت دهید",
                    "safety": "پخت و پز با کمک بزرگسال و با رعایت ایمنی انجام شود"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "hayat",
    "folder": "hayat",
    "name": "حیاط",
    "icon": "🌳",
    "heroPos": {
      "left": {
        "x": 12,
        "y": 80
      },
      "center": {
        "x": 58,
        "y": 55
      },
      "right": {
        "x": 78,
        "y": 78
      }
    },
    "views": {
      "herog": {
        "label": "فوتبال، دویدن، پرش و دوچرخه",
        "hotspots": [
          {
            "title": "فوتبال",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "کاشت بذر در گلدان",
                    "type": "activity",
                    "desc": "تقویت مسئولیت‌پذیری و شناخت طبیعت",
                    "category": "طبیعت",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "گلدان, خاک, بذر, آب",
                    "instructions": "گلدان را با خاک پر کنید → بذر را در خاک بکارید → آب بدهید → هر روز آبیاری کنید و رشد را تماشا کنید",
                    "safety": "از خاک تمیز و بذرهای امن استفاده کنید"
                  },
                  {
                    "title": "بازرسی روزانه‌ی وسایل بازی",
                    "type": "activity",
                    "category": "حیاط",
                    "audience": "مربی",
                    "source": "بازی‌سازان",
                    "desc": "پیش از شروع بازی، باید سالم‌بودن تاب، سرسره و سایر وسایل حیاط بررسی شود."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "دوز",
                    "type": "activity",
                    "desc": "تقویت تفکر استراتژیک",
                    "category": "بازی فکری",
                    "ageMin": 5,
                    "ageMax": 6,
                    "duration": 15,
                    "materials": "کاغذ, مداد",
                    "instructions": "جدول دوز را رسم کنید → نوبتی علامت بگذارید → هدف: سه علامت در یک ردیف → با هم بازی کنید",
                    "safety": ""
                  }
                ]
              }
            ]
          },
          {
            "title": "دویدن",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "دویدن",
                "items": [
                  {
                    "title": "حباب‌سازی",
                    "type": "activity",
                    "desc": "تقویت دنبال کردن چشم و حرکات درشت",
                    "category": "بازی حسی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "محلول حباب, حلقه حباب",
                    "instructions": "محلول حباب را آماده کنید → حباب بسازید → از کودک بخواهید حباب‌ها را تعقیب کند → با هم حباب‌ها را بترکانید",
                    "safety": "از محلول غیرسمی استفاده کنید و از برخورد محلول با چشم جلوگیری کنید"
                  },
                  {
                    "title": "کفپوش نرم زیر وسایل بازی",
                    "type": "activity",
                    "category": "حیاط",
                    "audience": "مربی",
                    "source": "ایمن ترافیک مگ",
                    "desc": "سطح زیر تاب و سرسره باید کفپوش نرم و استاندارد داشته باشد تا آسیب افتادن کاهش یابد."
                  }
                ]
              }
            ]
          },
          {
            "title": "پرش",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "پرش",
                "items": [
                  {
                    "title": "شن‌بازی",
                    "type": "activity",
                    "desc": "تقویت مهارت ظریف و حس لامسه",
                    "category": "بازی حسی",
                    "ageMin": 1,
                    "ageMax": 4,
                    "duration": 25,
                    "materials": "سطل, بیل, شن",
                    "instructions": "شن را در محوطه بازی بریزید → از کودک بخواهید با بیل شن را جابه‌جا کند → با هم قلعه بسازید → با هم بازی کنید",
                    "safety": "از شن تمیز استفاده کنید و از خوردن شن توسط کودک جلوگیری کنید"
                  },
                  {
                    "title": "حذف لبه‌های تیز از فضای بازی",
                    "type": "activity",
                    "category": "حیاط",
                    "audience": "مربی",
                    "source": "برین تجارت پادیاو",
                    "desc": "سنگ‌های تیز، ریشه‌ی درخت و لبه‌های فلزی باید از حیاط جمع‌آوری یا با محافظ پوشانده شوند."
                  }
                ]
              }
            ]
          },
          {
            "title": "دوچرخه",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "دوچرخه",
                "items": [
                  {
                    "title": "بازی آب",
                    "type": "activity",
                    "desc": "تقویت حس لامسه و حرکات درشت",
                    "category": "بازی حسی",
                    "ageMin": 1,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "استخر کوچک, آب, اسباب‌بازی آب",
                    "instructions": "استخر کوچک را با آب پر کنید → اسباب‌بازی‌ها را داخل آب بگذارید → از کودک بخواهید با آب بازی کند → همیشه کودک را تحت نظر داشته باشید",
                    "safety": "همیشه کودک را هنگام بازی با آب تحت نظر داشته باشید - خطر غرق شدن"
                  },
                  {
                    "title": "نظارت مداوم بزرگسالان در حیاط",
                    "type": "activity",
                    "category": "حیاط",
                    "audience": "مربی",
                    "source": "ایمن ترافیک مگ",
                    "desc": "حضور و نظارت پیوسته‌ی مربی در تمام مدت بازی کودکان، مهم‌ترین عامل پیشگیری از حادثه است."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "باغ، گیاهان، حشرات و طبیعت",
        "hotspots": [
          {
            "title": "باغ",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "گرگم به هوا",
                    "type": "activity",
                    "desc": "تقویت دویدن و همکاری گروهی",
                    "category": "بازی حرکتی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "فضای باز",
                    "instructions": "یک نفر گرگ می‌شود → بقیه گله می‌شوند → وقتی گرگ می‌گوید گرگم به هوا، همه می‌دوند → کسی که گرفته شود گرگ بعدی می‌شود",
                    "safety": "از فضای باز و امن بدون مانع استفاده کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "جستجوی گنج طبیعت",
                    "type": "activity",
                    "desc": "تقویت مشاهده و طبقه‌بندی",
                    "category": "طبیعت",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "چک‌لیست تصویری",
                    "instructions": "چک‌لیستی از اشیاء طبیعی تهیه کنید (برگ، سنگ، گل) → از کودک بخواهید اشیاء را پیدا کند → با هم پیدا شده‌ها را بررسی کنید → درباره هر شیء صحبت کنید",
                    "safety": "از گیاهان غیرسمی استفاده کنید و به کودک آموزش دهید گیاهان را نخورد"
                  }
                ]
              }
            ]
          },
          {
            "title": "گیاهان",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "گیاهان",
                "items": [
                  {
                    "title": "وسطی",
                    "type": "activity",
                    "desc": "تقویت پرتاب و گرفتن توپ",
                    "category": "بازی حرکتی",
                    "ageMin": 5,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "توپ نرم",
                    "instructions": "کودکان در دایره می‌ایستند → یک نفر وسط می‌ایستد → بازیکنان توپ را به سمت وسطی پرتاب می‌کنند → اگر وسطی توپ را بگیرد، پرتاب‌کننده وسط می‌رود",
                    "safety": "از توپ نرم استفاده کنید و به صورت بدون رقابت بازی کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "حشرات",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "حشرات",
                "items": [
                  {
                    "title": "لی‌لی",
                    "type": "activity",
                    "desc": "تقویت تعادل و هماهنگی",
                    "category": "بازی حرکتی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "گچ, سطح صاف",
                    "instructions": "با گچ خانه‌های شماره‌دار بکشید → از کودک بخواهید روی یک پا بپرد → خانه‌ها را به ترتیب پشت سر بگذارد → با هم شمارش کنید",
                    "safety": "از سطح صاف و بدون خطر استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "طبیعت",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "طبیعت",
                "items": [
                  {
                    "title": "قایم موشک",
                    "type": "activity",
                    "desc": "تقویت پایداری شیء و صبر",
                    "category": "بازی حرکتی",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "فضای باز",
                    "instructions": "یک نفر چشم می‌گذارد و می‌شمارد → بقیه قایم می‌شوند → بعد از شمارش، به دنبال بقیه می‌گردد → هر کس پیدا شود، نفر بعدی است",
                    "safety": "از محدوده‌ای امن برای بازی استفاده کنید"
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "گچ، آب و شن، بذر و برگ",
        "hotspots": [
          {
            "title": "گچ",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "نقاشی با گچ روی زمین",
                    "type": "activity",
                    "desc": "تقویت خلاقیت و مهارت ظریف",
                    "category": "هنر در حیاط",
                    "ageMin": 2,
                    "ageMax": 6,
                    "duration": 25,
                    "materials": "گچ رنگی, سطح صاف",
                    "instructions": "گچ‌های رنگی را به کودک بدهید → از کودک بخواهید روی زمین نقاشی کند → با هم نقاشی کنید → از خلاقیت کودک لذت ببرید",
                    "safety": "از گچ غیرسمی استفاده کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "بازی توپ و دیوار",
                    "type": "activity",
                    "desc": "تقویت هماهنگی دست-چشم",
                    "category": "بازی حرکتی",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "توپ",
                    "instructions": "توپ را به دیوار پرتاب کنید → توپ را بگیرید → مراحل مختلف را تمرین کنید → با هم بازی کنید",
                    "safety": "از توپ نرم استفاده کنید و از دیوار امن و بدون پنجره استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "آب و شن",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "بادبادک‌بازی",
                    "type": "activity",
                    "desc": "تقویت حرکات درشت و صبر",
                    "category": "طبیعت",
                    "ageMin": 4,
                    "ageMax": 6,
                    "duration": 30,
                    "materials": "بادبادک, نخ",
                    "instructions": "بادبادک را آماده کنید → روز بادی را انتخاب کنید → به کودک نشان دهید چگونه بادبادک را به پرواز درآورد → با هم بادبادک را کنترل کنید",
                    "safety": "از نخ کوتاه و در فضای باز بدون سیم برق استفاده کنید"
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "غلت‌زدن روی چمن",
                    "type": "activity",
                    "desc": "تقویت حس بدن و حرکات درشت",
                    "category": "بازی حرکتی",
                    "ageMin": 1,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "چمن یا فرش نرم",
                    "instructions": "روی چمن یا فرش نرم بخوابید → از کودک بخواهید غلت بزند → با هم غلت بزنید → از بازی لذت ببرید",
                    "safety": "از سطح نرم و بدون سنگ استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "بذر",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "بذر",
                "items": [
                  {
                    "title": "بازی با برگ‌ها",
                    "type": "activity",
                    "desc": "تقویت حس لامسه و شنوایی",
                    "category": "طبیعت",
                    "ageMin": 1,
                    "ageMax": 4,
                    "duration": 15,
                    "materials": "برگ‌های خشک",
                    "instructions": "برگ‌های خشک را جمع کنید → صدای برگ‌ها را بشنوید → از کودک بخواهید برگ‌ها را لمس کند → با هم برگ‌ها را پرتاب کنید",
                    "safety": "برگ‌های غیرسمی و تمیز استفاده کنید"
                  }
                ]
              }
            ]
          },
          {
            "title": "برگ",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "برگ",
                "items": [
                  {
                    "title": "مشاهده حشرات",
                    "type": "activity",
                    "desc": "تقویت مشاهده و شناخت طبیعت",
                    "category": "طبیعت",
                    "ageMin": 3,
                    "ageMax": 6,
                    "duration": 20,
                    "materials": "ذره‌بین",
                    "instructions": "مورچه یا پروانه را پیدا کنید → با ذره‌بین مشاهده کنید → درباره حشره صحبت کنید → به کودک یاد دهید حشره را اذیت نکند",
                    "safety": "به کودک آموزش دهید حشرات را لمس نکند و از حشرات خطرناک دوری کند"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    "id": "maddakari",
    "folder": "tavanbakhshi",
    "name": "مددکاری و کودک‌یاری",
    "icon": "🤝",
    "desc": "اتاق مددکاری اجتماعی و کودک‌یاری — شناسایی، حمایت و پیگیری وضعیت کودکان و خانواده‌ها",
    "views": {
      "herog": {
        "label": "مشاوره، اقتصادی، بهزیستی و فرزندپروری",
        "hotspots": [
          {
            "title": "مشاوره",
            "x": 20,
            "y": 42,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "مشاوره و پشتیبانی خانواده",
                    "type": "activity",
                    "desc": "جلسات گفت‌وگو با والدین درباره‌ی نگرانی‌های تربیتی و رفتاری",
                    "category": "مددکاری",
                    "ageMin": 2,
                    "ageMax": 6
                  },
                  {
                    "title": "شرایط تحصیلی مددکار مهدکودک",
                    "type": "activity",
                    "category": "مددکاری و کودک‌یاری",
                    "audience": "مربی",
                    "source": "سازمان بهزیستی",
                    "desc": "طبق دستورالعمل بهزیستی، مددکار مهدکودک باید مدرک کارشناسی روان‌شناسی، مددکاری اجتماعی یا رشته‌های مرتبط داشته باشد."
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "رسیدگی به کودکان کم‌سرپرست",
                    "type": "activity",
                    "desc": "پیگیری ویژه‌ی وضعیت کودکان بی‌سرپرست یا کم‌سرپرست",
                    "category": "مددکاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "اقتصادی",
            "x": 42,
            "y": 58,
            "categories": [
              {
                "title": "اقتصادی",
                "items": [
                  {
                    "title": "پیگیری وضعیت اجتماعی-اقتصادی خانواده",
                    "type": "activity",
                    "desc": "شناسایی خانواده‌های نیازمند حمایت و پیگیری وضعیت آن‌ها",
                    "category": "مددکاری",
                    "ageMin": 2,
                    "ageMax": 6
                  },
                  {
                    "title": "وظیفه‌ی مددکار در حمایت از کودک",
                    "type": "activity",
                    "category": "مددکاری و کودک‌یاری",
                    "audience": "مربی",
                    "source": "socialwork2015",
                    "desc": "مددکاران اجتماعی مسئول شناسایی نشانه‌های آزار، غفلت یا ناامنی کودک و هماهنگی خدمات حمایتی هستند."
                  }
                ]
              }
            ]
          },
          {
            "title": "بهزیستی",
            "x": 62,
            "y": 42,
            "categories": [
              {
                "title": "بهزیستی",
                "items": [
                  {
                    "title": "هماهنگی با بهزیستی و مراکز حمایتی",
                    "type": "activity",
                    "desc": "ارجاع پرونده‌های خاص به نهادهای حمایتی مرتبط",
                    "category": "مددکاری",
                    "ageMin": 2,
                    "ageMax": 6
                  },
                  {
                    "title": "حمایت مددکاری از کودکان بازمانده از تحصیل",
                    "type": "activity",
                    "category": "مددکاری و کودک‌یاری",
                    "audience": "مربی",
                    "source": "انجمن حمایت از کودکان کار",
                    "desc": "کمک مالی و مداخله‌ی مددکاری اجتماعی می‌تواند از بازماندن کودکان کم‌برخوردار از تحصیل جلوگیری کند."
                  }
                ]
              }
            ]
          },
          {
            "title": "فرزندپروری",
            "x": 84,
            "y": 58,
            "categories": [
              {
                "title": "فرزندپروری",
                "items": [
                  {
                    "title": "آموزش مهارت‌های فرزندپروری به والدین",
                    "type": "activity",
                    "desc": "کارگاه‌های کوتاه برای والدین درباره‌ی تربیت کودک",
                    "category": "مددکاری",
                    "ageMin": 2,
                    "ageMax": 6
                  },
                  {
                    "title": "مهارت‌های کلیدی مددکار کودک",
                    "type": "activity",
                    "category": "مددکاری و کودک‌یاری",
                    "audience": "مربی",
                    "source": "socialwork2015",
                    "desc": "همدلی، توانایی مدیریت استرس و ارتباط شفاهی و نوشتاری قوی از مهارت‌های اصلی مددکار کودک است."
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_left": {
        "label": "خواندن، نوشتن، ریاضی و شنوایی",
        "hotspots": [
          {
            "title": "خواندن",
            "x": 20,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "غربالگری نشانه‌های اختلال یادگیری",
                    "type": "activity",
                    "desc": "مشاهده و ثبت زودهنگام نشانه‌های خواندن/نوشتن/ریاضی برای ارجاع به‌موقع",
                    "category": "شناسایی",
                    "ageMin": 3,
                    "ageMax": 6
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "تشکیل پرونده‌ی اولیه‌ی کودک",
                    "type": "activity",
                    "desc": "ثبت مشاهدات و سوابق برای پیگیری‌های بعدی",
                    "category": "شناسایی",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "نوشتن",
            "x": 42,
            "y": 56,
            "categories": [
              {
                "title": "نوشتن",
                "items": [
                  {
                    "title": "غربالگری تمرکز و توجه",
                    "type": "activity",
                    "desc": "مشاهده‌ی رفتار کودک در کلاس و ثبت نشانه‌های کم‌توجهی",
                    "category": "شناسایی",
                    "ageMin": 3,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "ریاضی",
            "x": 64,
            "y": 40,
            "categories": [
              {
                "title": "ریاضی",
                "items": [
                  {
                    "title": "بررسی رشد گفتار و زبان",
                    "type": "activity",
                    "desc": "ارزیابی اولیه‌ی توانایی گفتاری متناسب با سن",
                    "category": "شناسایی",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "شنوایی",
            "x": 86,
            "y": 56,
            "categories": [
              {
                "title": "شنوایی",
                "items": [
                  {
                    "title": "ارزیابی مهارت‌های حرکتی",
                    "type": "activity",
                    "desc": "مشاهده‌ی هماهنگی حرکتی و ارجاع در صورت نیاز",
                    "category": "شناسایی",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          }
        ]
      },
      "herog_right": {
        "label": "IEP، ارجاع، حمایت روزانه و آرام‌سازی",
        "hotspots": [
          {
            "title": "IEP",
            "x": 16,
            "y": 40,
            "categories": [
              {
                "title": "معرفی و شناخت",
                "items": [
                  {
                    "title": "برنامه آموزش فردی (IEP)",
                    "type": "activity",
                    "desc": "تدوین برنامه‌ی ویژه‌ی متناسب با نیاز هر کودک",
                    "category": "کودک‌یاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              },
              {
                "title": "فعالیت و کاربرد",
                "items": [
                  {
                    "title": "ارتباط روزانه با مربی کلاس",
                    "type": "activity",
                    "desc": "تبادل اطلاعات روزانه درباره‌ی وضعیت کودک با مربی",
                    "category": "کودک‌یاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "ارجاع",
            "x": 38,
            "y": 56,
            "categories": [
              {
                "title": "ارجاع",
                "items": [
                  {
                    "title": "هماهنگی ارجاع به گفتاردرمانی و کاردرمانی",
                    "type": "activity",
                    "desc": "معرفی و پیگیری وضعیت کودک نزد متخصصان بیرون از مهد",
                    "category": "کودک‌یاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "حمایت روزانه",
            "x": 60,
            "y": 40,
            "categories": [
              {
                "title": "حمایت روزانه",
                "items": [
                  {
                    "title": "برنامه‌ی حمایت روزانه‌ی کودک",
                    "type": "activity",
                    "desc": "همراهی روزانه‌ی کودکان نیازمند توجه ویژه در طول برنامه‌ی مهد",
                    "category": "کودک‌یاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          },
          {
            "title": "آرام‌سازی",
            "x": 82,
            "y": 56,
            "categories": [
              {
                "title": "آرام‌سازی",
                "items": [
                  {
                    "title": "بازی و هنر برای آرام‌سازی کودک",
                    "type": "activity",
                    "desc": "استفاده از بازی، موسیقی و هنر برای کاهش اضطراب کودک",
                    "category": "کودک‌یاری",
                    "ageMin": 2,
                    "ageMax": 6
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
];

const ARCHIVE_DATA = [{"title": "آزمونک وصل کردن شکل ها دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "آزمون ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/223py.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/22opy.webp", "desc": "این فایل مربوط به آزمون پایانی برای نوآموزان پیش دبستانی است که بر مفاهیم پایه ریاضی تمرکز دارد. جهت آمادگی برای آزمون ریاضی پیش دبستان این فایل را دریافت کنید."}, {"title": "آزمون فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IM22y.pdf", "source": "سمیه روحی"}, {"title": "آزمون ورودی اول ابتدایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/آزمون-ورودی-اول-ابتدایی.pdf", "source": "سمیه روحی"}, {"title": "آزمون ورودی پیش‌دبستانی به پایه اول | سنجش آمادگی کودکان برای ورود به دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/آزمون-ورودی-پیش‌دبستانی-به-پایه-اول.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/آزمون-ورودی-پیش‌دبستانی-به-پایه-اول.webp", "desc": "اگر به دنبال یک آزمون استاندارد و کاربردی برای ارزیابی آمادگی کودک جهت ورود به پایه اول دبستان هستید، آزمون ورودی پیش‌دبستانی به پایه اول بهترین انتخاب برای"}, {"title": "دانلود رایگان آزمون ورودی پیش دبستانی به پایه اول", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/آزمون-ورودی-پیش-دبستانی-به-پایه-اول.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/آزمون-ورودی-پیش-دبستانی-به-پایه-اول.webp", "desc": "این فایل یک نمونه آزمون ورودی پیش دبستانی به پایه اول است که با هدف ارزیابی آمادگی آن‌ها برای ورود به کلاس اول طراحی شده است."}, {"title": "آزمون ورودی پیش دبستانی به پایه اول", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/آزمون-ورودی-پیش-دبستانی-به-پایه-اول.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش‌دبستانی آشنایی با مشاغل (معلم)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T211744.963.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش دبستان آموزش حواس پنجگانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T192433.033.pdf", "source": "سمیه روحی"}, {"title": "آموزش ریاضی عدد۲پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/1-36.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-20-1.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "آموزش سایه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/سایه.pdf", "source": "سمیه روحی"}, {"title": "آموزش عدد ۸ به پیش دبستانی ها", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/8.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/81.jpg", "desc": "این کاربرگ آموزشی برای کودکان پیش‌دبستانی طراحی شده و هدف آن آموزش عدد ۸ به پیش دبستانی به شیوه‌ای جذاب و تصویری است. در مرکز تصویر، عدد ۸ با رنگ زرد و به"}, {"title": "کاربرگ رایگان آموزش فصل پاییز برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T230715.674.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T230702.342.webp", "desc": "کاربرگ آموزش فصل پاییز برای پیش دبستانی با طراحی ساده و مؤثر، درخت پاییزی را به شکلی نمایش می‌دهد که به راحتی برای کودکان قابل درک و رنگ‌آمیزی است. طرح کلی"}, {"title": "آموزش و مرور اشکال هندسی تلفیق با هنر پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/آموزش-و-مرور-اشکال-هندسی-تلفیق-با-هنر-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ اعضای بدن پرندگان علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-14.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-17.webp", "desc": "کاربرگ اعضای بدن پرندگان آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن پرندگان به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن پرنده"}, {"title": "آزمون فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IMG_3404-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/s62py.webp", "desc": "هدف امتحان فارسی پیش دبستانی سنجش درک مفاهیم پایه مانند تشخیص جهت‌ها (چپ و راست)، شناخت نیازهای رشد گیاهان و شناسایی موجودات زنده طراحی شده است."}, {"title": "ایده برای نقاشی بهداشت فردی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T210317.076.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T210303.273.webp", "desc": "در کاربرگ ایده برای نقاشی بهداشت فردی، تصویر کودکی که در حال شستن دست و صورت است همراه با یک گربه در کنار او و چند وسیله بهداشتی شامل دستگیره در، آب‌پاش،"}, {"title": "ایده برای نقاشی بهداشت فردی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T202814.125.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T202752.798.webp", "desc": "در کاربرگ ایده برای نقاشی بهداشت فردی، تصویر کودکی که در حال مسواک زدن است همراه با چند وسیله بهداشتی شامل صابون ، لیوان مخصوص و مسواک در اختیار دانش‌آموز"}, {"title": "ایده نقاشی دانشمند برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-17-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-39.webp", "desc": "کاربرگ نقاشی دانشمند برای پیش دبستان، نقاشی درباره‌ی یک دانشمند است."}, {"title": "برگه املا و نقاشی اتوبوسی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/برگه-املا-و-نقاشی-اتوبوسی-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/برگه-املا-و-نقاشی-اتوبوسی-دبستان.webp", "desc": "برگه املا و نقاشی اتوبوسی دبستان یک فعالیت جذاب و خلاقانه برای تلفیق یادگیری و سرگرمی است. در این برگه، دانش‌آموزان با نوشتن کلمات یا جملات املایی داخل"}, {"title": "ترتیب لوحه نویسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/08/ترتیب-لوحه-نویسی-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "تمرین آواشناسی نشانه ب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/ب.pdf", "source": "سمیه روحی"}, {"title": "تمرین تابستانه جمع ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تمرین-تابستانه-جمع-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تمرین تابستانه دستورزی با قیچی پازل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تمرین-تابستانه-دستورزی-با-قیچی-پازل-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تمرین-تابستانه-دستورزی-با-قیچی-پازل-پیش-دبستان.jpg", "desc": "تمرین تابستانه دستورزی با قیچی پازل پیش دبستان را کاملا رایگان در سایت دکتر سمیه روحی دانلود کنید. یک فعالیت آموزشی جذاب که برای تقویت مهارت دستورزی، حل مسئله"}, {"title": "تمرین تابستانه دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تمرین-تابستانه-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تمرین دست‌ورزی و تقویت مهارت‌های حرکتی پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تمرین-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تمرین دست ورزی پیش دبستان ویژه تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تمرین-دست-ورزی-پیش-دبستان-ویژه-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تمرین-دست-ورزی-پیش-دبستان-ویژه-تابستان.webp", "desc": "آیا می‌دانستید که مهارت نوشتن، پیش از آنکه به مداد و کاغذ مربوط باشد، به قدرت عضلات کوچک دست فرزند شما بستگی دارد؟ دوره پیش‌دبستانی و به‌ویژه ایام تابستان،"}, {"title": "تمرین لوحه نویسی و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی.webp", "desc": "تمرین لوحه نویسی و دست ورزی پیش دبستان: این کاربرگ دوست‌داشتنی، کودکان را به دنیای پربار باران و طبیعت می‌برد و همزمان مهارت‌های دست‌ورزی آن‌ها را تقویت"}, {"title": "تمرین لوحه نویسی پیش دبستان pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/تمرین-لوحه-نویسی-پیش-دبستان-pdf.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/تمرین-لوحه-نویسی-پیش-دبستان-pdf.webp", "desc": "این تمرین لوحه نویسی پیش دبستان، ابزاری عالی برای تقویت مهارت‌های نوشتاری در دانش‌آموزان پیش دبستانی و سال‌های اول دبستان است. جمله‌ی اصلی که کودک باید با دقت"}, {"title": "تمرین ماز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تمرین-ماز-پیش-دبستانی-1.pdf", "source": "سمیه روحی"}, {"title": "آموزش مفهوم تقارن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تقارن-پیش-دستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مفهوم-تقارن-پیش-دبستان-1.webp", "desc": "آیا به دنبال یک فعالیت آموزشی متفاوت و سرگرم‌کننده برای فرزند خود هستید؟ آموزش تقارن به کودکان با استفاده از طرح چهره انسان، یک روش جذاب و مؤثر برای آشنایی"}, {"title": "تکلیف آموزش رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-3.pdf", "source": "سمیه روحی"}, {"title": "تکلیف تابستانه دستورزی با قیچی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تکلیف-تابستانه-دستورزی-با-قیچی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تکلیف تابستانه مهارت دستورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تکلیف-تابستانه-مهارت-دستورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/تکلیف-تابستانه-مهارت-دستورزی-پیش-دبستان.webp", "desc": "این تصویر یک برگه تمرینی و آموزشی برای کودکان پیش‌دبستانی است که با هدف تقویت مهارت‌های دستورزی، هماهنگی چشم و دست، و آمادگی برای نوشتن طراحی شده است. در این"}, {"title": "تکلیف جذاب ماتریس پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-جذاب-ماتریس-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-جذاب-ماتریس-پیش-دبستان.webp", "desc": "این تکلیف جذاب ماتریس پیش دبستان یک تمرین جذاب و کاربردی برای کودکان است که با هدف تقویت ادراک دیداری، تطبیق، طبقه‌بندی، مهارت‌های شناختی و هماهنگی چشم و دست"}, {"title": "تکلیف دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-دست-ورزی-پیش-دبستان.webp", "desc": "این تکلیف دست ورزی پیش دبستان یک تمرین جذاب و ساده برای تقویت مهارت‌های دست‌ورزی و هماهنگی چشم و دست در کودکان است. در این برگه، تصویر یک خرگوش کارتونی بامزه"}, {"title": "تکلیف رایگان دقت و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-دقت-تمرکز-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-دقت-تمرکز-پیش-دبستان.webp", "desc": "آیا به دنبال یک فعالیت آموزشی جذاب برای افزایش تمرکز فرزند خود هستید؟ کاربرگ دقت و تمرکز پیش‌دبستانی که در تصویر مشاهده می‌کنید، یک ابزار فوق‌العاده برای"}, {"title": "تکلیف رایگان رنگ آمیزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/تکلیف-رایگان-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/تکلیف-رایگان-رنگ-آمیزی-پیش-دبستان.webp", "desc": "این تکلیف رایگان رنگ آمیزی پیش دبستانی نه تنها برای تقویت مهارت‌های حرکتی ظریف و بهبود نحوه در دست گرفتن مداد عالی است، بلکه ذهن کودک را به چالش می‌کشد تا"}, {"title": "تکلیف رایگان لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/08/تکلیف-رایگان-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/08/تکلیف-رایگان-لوحه-نویسی-پیش-دبستان.webp", "desc": "آمادگی برای ورود به دنیای دبستان، هیجان خاص خود را دارد! یکی از مهم‌ترین مهارت‌هایی که نوآموزان در دوره پیش‌دبستان باید بیاموزند، توانایی کنترل مداد و کشیدن"}, {"title": "تکلیف رایگان هوش ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-خلاق-هوش-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تکلیف رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی-1.webp", "desc": "آیا به دنبال یک فعالیت جذاب و آرامش‌بخش برای کودک خود هستید؟ کاربرگ رنگ آمیزی گربه که در تصویر مشاهده می‌کنید، یک ابزار فوق‌العاده برای تقویت مهارت‌های حرکتی"}, {"title": "تکلیف ریاضی آشنایی با عدد دو (۲) مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تکلیف-ریاضی-آشنایی-با-عدد-دو-۲-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تکلیف-ریاضی-آشنایی-با-عدد-دو-۲-مرور-تابستان.webp", "desc": "یادگیری اعداد، خشت اول بنای ریاضیات است. عدد «۲» به عنوان یکی از اولین مفاهیمی که کودک با آن آشنا می‌شود، نقش مهمی در درک مفهوم «جفت» و «مقدار» دارد. کاربرگ"}, {"title": "تکلیف ریاضی آشنایی با عدد ۹ مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/تکلیف-ریاضی-آشنایی-با-عدد-۹-مرور-تابستان.pdf", "source": "سمیه روحی"}, {"title": "تکلیف زبان آموزی صدای غ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-زبان-آموزی-صدای-غ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-زبان-آموزی-صدای-غ-پیش-دبستان.webp", "desc": "این تکلیف زبان آموزی صدای غ پیش دبستان با هدف آموزش این صدا به کودکان طراحی شده است. در این تصویر، حرف «غ» به‌صورت بزرگ، برجسته و فانتزی در مرکز صفحه قرار"}, {"title": "تکلیف فارسی با صدا اول «ت» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-فارسی-با-صدا-اول-ت-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-فارسی-با-صدا-اول-ت-پیش-دبستان.webp", "desc": "یادگیری حروف الفبا و تشخیص صداهای اول کلمات، یکی از مهم‌ترین پایه‌های سوادآموزی در دوران پیش‌دبستان است. تکلیف فارسی با صدا اول «ت» پیش دبستان یکی از حروف"}, {"title": "تکلیف فارسی نشانه «ث» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکلیف-فارسی-نشانه-ث-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تکلیف واحد کار وسایل نقلیه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-واحد-کار-وسایل-نقلیه-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "تکیلف مروری زبان آموزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/تکیلف-مروری-زبان-آموزی-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "جشن پایان سال و فارغ‌التحصیلی پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/جشن-پایان-سال-و-فارغ‌التحصیلی-پیش‌دبستانی.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ رایگان حواس پنجگانه برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-2.webp", "desc": "کاربرگ رایگان حواس پنجگانه برای پیش دبستان با هدف آموزش و تثبیت شناخت حواس پنج‌گانه طراحی شده است و از دانش‌آموزان می‌خواهد تا ارتباط بین اشیاء روزمره و حواس"}, {"title": "داستان نویسی و رنگ آمیزی عید غدیر خم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/داستان-نویسی-و-رنگ-آمیزی-عید-غدیر-خم.pdf", "source": "سمیه روحی"}, {"title": "داناود رایگان کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-امیزی.webp", "desc": "داناود رایگان کاربرگ رنگ آمیزی پیش دبستان: این یک کاربرگ رنگ‌آمیزی برای کودکان پیش‌دبستانی است که به آن‌ها کمک می‌کند تا مهارت‌های حرکتی ظریف و تشخیص رنگ خود"}, {"title": "دانلود رایگان دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-دست-ورزی-پیش-دبستان.webp", "desc": "دانلود رایگان دست ورزی پیش دبستان:  یه کاربرگ میوه‌ای جذاب و خوشمزه برای کوچولوهاتون آماده کردیم! با این کاربرگ، بچه‌ها می‌تونن با خطوط نقطه‌چین و شکل‌های"}, {"title": "دانلود رایگان دست ورزی کار با قیچی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/دست-ورزی-کار-با-قیچی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-لوحه-نویسی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-لوحه-نویسی-پیش-دبستان.webp", "desc": "این کاربرگ لوحه نویسی پیش دبستان تمرینی عالی برای تقویت مهارت‌های ظریف دست کودکان شماست. با تمرکز بر رسم یک الگوی مشخص، کودکان با دقت مسیر خطوط مورب را دنبال"}, {"title": "دانلود رایگان لوحه نویسی پیش دبستانی pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دانلود-رایگان-لوحه-نویسی-پیش-دبستانی-pdf.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دانلود-رایگان-لوحه-نویسی-پیش-دبستانی.webp", "desc": "اگر به دنبال یک منبع آموزشی مناسب برای تقویت مهارت‌های نوشتاری کودکان هستید، لوحه نویسی پیش دبستانی یکی از بهترین ابزارها برای شروع یادگیری نوشتن در سنین"}, {"title": "دانلود رایگان لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان ماز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-ماز-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دانلود-رایگان-ماز-پیش-دبستان.webp", "desc": "این کاربرگ رایگان ماز پیش دبستان یک فعالیت آموزشی سرگرم‌کننده و موثر برای کودکان است که به آن‌ها کمک می‌کند تا مهارت‌های حرکتی ظریف و مهارت‌های حل مسئله خود"}, {"title": "دانلود رایگان کاربرگ رنگ آمیزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-رایگان-کاربرگ-رنگ-آمیزی-پیش-دبستانی-1-3.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان کاربرگ روز جهانی سالمند", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-روز-جهانی-سالمند.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-روز-جهانی-سالمند.webp", "desc": "کاربرگ روز جهانی سالمند نه تنها فرصتی برای رنگ‌آمیزی هستند بلکه آموزش احترام و محبت به سالمندان نیز می باشد. دانلود رایگان pdf"}, {"title": "دانلود رایگان کاربرگ علوم شناخت اعضای صورت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-علوم-اعضای-صورت-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-علوم-اعضای-صورت-پیش-دبستان.webp", "desc": "سلام قهرمان کوچک! آیا دوست داری با اجزای شگفت‌انگیز صورت خودت آشنا بشی؟ این کاربرگ علوم شناخت اعضای صورت پیش دبستان مخصوص شما طراحی شده تا ضمن بازی و سرگرمی،"}, {"title": "دانلود رایگان کاربرگ لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان کاربرگ لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دانلود-رایگان-کاربرگ-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دانلود-رایگان-کاربرگ-لوحه-نویسی-پیش-دبستان.webp", "desc": "این کاربرگ لوحه نویسی پیش دبستان، دروازه‌ی ورود فرزند دلبند شما به دنیای زیبانویسی فارسی است. با جمله‌ی دلگرم‌کننده‌ی &quot;فرزند کوشا، با دقت و زیبا بنویس&quot;، کودک"}, {"title": "دانلود رایگان کاربرگ ماز آموزشی پیش دبستانی و دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-آموزشی-پیش-دبستانی-و-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-آموزشی-پیش-دبستانی-و-دبستان-598x800.webp", "desc": "آیا به دنبال تمرین‌هایی جامع و هدفمند برای تقویت مهارت‌های پایه کودکان هستید؟ فایل PDF پیش رو یک مجموعه کاربردی و جذاب شامل ۵ کاربرگ ماز آموزشی پیش دبستانی و"}, {"title": "دانلود رایگان کاربرگ ماز ساده", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-ساده.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-ساده.webp", "desc": "مجموعه‌ای که پیش رو دارید، شامل ۴ کاربرگ ماز (مسیریابی) ساده و جذاب است که به صورت کاملاً رایگان برای دانلود در اختیار شما قرار گرفته است. این مجموعه با هدف"}, {"title": "کاربرگ رایگان نقاشی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-رایگان-کاربرگ-نقاشی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-رایگان-کاربرگ-نقاشی-پیش-دبستانی.webp", "desc": "تصویر کاربرگ رایگان نقاشی پیش دبستانی ، ما را به دنیای سادگی و شادی کودکانه می‌برد. دو کشتی کوچک با چهره‌های خندان، روی موج‌های آرام دریا در حرکتند و در"}, {"title": "دانلود رایگان کاربرگ های روز کودک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-رایگان-کاربرگ-های-روز-کودک-.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان ۷ کاربرگ به مناسبت روز مادر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-رایگان-۷-کاربرگ-به-مناسبت-روز-مادر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-رایگان-۷-کاربرگ-به-مناسبت-روز-مادر.webp", "desc": "کاربرگ به مناسبت روز مادر  (۲۰ آذر)، روز گرامیداشت مقام شامخ حضرت فاطمه زهرا (س) و روز زن در ایران، مجموعه‌ای دلنشین و رایگان برای کودکان و دانش‌آموزان عزیز"}, {"title": "دانلود رایگان ۹ کاربرگ زیبا روز مادر ۲۰ آذر pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-رایگان-۹-کاربرگ-زیبا-روز-مادر-۲۰-آذر-pdf.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-رایگان-۹-کاربرگ-زیبا-روز-مادر-۲۰-آذر-pdf.webp", "desc": "این مجموعه ۹ کاربرگ زیبا روز مادر ۲۰ آذر با هدف بزرگداشت این روز زیبا، طراحی شده است. کاربرگ‌ها شامل صفحات رنگ‌آمیزی کودکانه با محلی برای نوشتن پیام تبریک، و"}, {"title": "دانلود لوحه نویسی پیش دبستانی pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دانلود-لوحه-نویسی-پیش-دبستانی-pdf.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دانلود-لوحه-نویسی-پیش-دبستانی-pdf.webp", "desc": "این لوحه نویسی پیش دبستانی، ابزاری عالی برای تقویت مهارت‌های خوشنویسی و دست‌خط فارسی فرزندان شماست. تمرین خط نه تنها به زیبایی نگارش کمک می‌کند، بلکه به تقویت"}, {"title": "دانلود نمونه کاربرگ دست ورزی پیش دبستانی | رایگان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/نمونه-کاربرگ-دست‌ورزی.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحدکار حشرات پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T191106.499.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحد کار حشرات پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-واحد-کار-حشرات-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-واحد-کار-حشرات-پیش-دبستان.webp", "desc": "به دنیای شگفت‌انگیز و رنگارنگ حشرات خوش آمدید! واحد کار حشرات پیش دبستان، یکی از جذاب‌ترین بخش‌های برنامه آموزشی پیش‌دبستانی است که کودکان را با موجودات کوچک"}, {"title": "دانلود واحد کار ریاضی تم 6 پایه اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-واحد-کار-ریاضی-تم-6-پایه-اول-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحد کار علوم پیش دبستان شناخت حواس پنجگانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-واحد-کار-علوم-پیش-دبستان-شناخت-حواس-پنجگانه-.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحد کار فصل پاییز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-فصل-پاییز-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحد کار ماز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/واحد-کار-ماز-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/واحد-کار-ماز-پیش-دبستان.webp", "desc": "این کاربرگ واحد کار ماز پیش دبستان یک ابزار آموزشی و تفریحی است که با هدف تقویت مهارت‌های ذهنی و حرکتی در کودکان طراحی شده است. این کاربرگ شامل یک ماز جذاب"}, {"title": "دانلود واحد کار گیاهان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-واحد-کار-گیاهان-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-واحد-کار-گیاهان-پیش-دبستانی.webp", "desc": "همراهان عزیز، امروز وارد دنیای شگفت‌انگیز گیاهان می‌شویم! این واحد کار گیاهان پیش‌دبستانی، فرصتی است تا نوگلان شما از نزدیک با رازهای رشد، تغذیه و اهمیت گل‌ها"}, {"title": "دانلود کاربرگ آشنایی با ماه و آسمان شب پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T223509.511.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T223450.107.webp", "desc": "کاربرگ آشنایی با ماه و آسمان شب تصویری از آسمان شب را به کودک نشان می‌دهد که عنصر اصلی آن ماه است. ماه در مرکز یا بخش اصلی تصویر قرار دارد و اطراف آن ابرها و"}, {"title": "دانلود کاربرگ اشکال هندسی(دایره) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-اشکال-هندسی-دایره-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-اشکال-هندسیدایره-پیش-دبستان.webp", "desc": "آموزش مفاهیم پایه را با هیجان شروع کنید! 🤩 کاربرگ اشکال هندسی(دایره) پیش دبستان اولین گام شیرین کودک شما برای ورود به دنیای شگفت‌انگیز اشکال هندسی است. با این"}, {"title": "دانلود کاربرگ اشکال هندسی (لوزی) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-اشکال-هندسی-لوزی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ اشکال هندسی (مثلث) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-اشکال-هندسی-مثلث-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ اشکال هندسی (مستطیل) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-اشکال-هندسی-مستطیل-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-اشکال-هندسی-مستطیل-پیش-دبستان.webp", "desc": "این کاربرگ اشکال هندسی (مستطیل) پیش دبستان، دروازه‌ای است به دنیای زیبای هندسه برای فرزند دلبند شما. با فعالیت‌های گام به گام و تصویرسازی‌های دوست‌داشتنی،"}, {"title": "دانلود کاربرگ اعضای بدن جانوران علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T233402.649.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T233343.458.webp", "desc": "کاربرگ اعضای بدن جانوران آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن جانوران به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن جانور"}, {"title": "دانلود کاربرگ تفاوت ها پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تفاوت-ها-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ تقویت دست ورزی | PDF رایگان و قابل چاپ", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-کاربرگ-تقویت-دست-ورزی.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ دامپزشکی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T202158.385.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-دست-ورزی-پیش-دبستان.webp", "desc": "کاربرگ دست ورزی پیش دبستان، دروازه‌ای به سوی خط زیبا و خواناست! در این کاربرگ، فرصتی طلایی برای فرزند کوشای شما فراهم شده تا با تمرین‌های هدفمند، مهارت‌های"}, {"title": "دانلود کاربرگ راهنمایی و رانندگی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-راهنمایی-و-رانندگی.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ برای روز آتشنشانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-کاربرگ-برای-روز-آتشنشانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/دانلود-کاربرگ-برای-روز-آتشنشانی-586x800.webp", "desc": "این کاربرگ برای روز آتشنشانی با هدف آشنایی کودکان با شغل آتش‌نشان و تجهیزات مرتبط طراحی شده است. تمرکز این فعالیت‌ها بر تقویت مهارت‌هایی چون هماهنگی چشم و"}, {"title": "دانلود کاربرگ رنگ‌آمیزی؛ فعالیتی جذاب برای افزایش تمرکز و خلاقیت دانش‌آموزان دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-جذاب-رنگ-آمیزی-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-جذاب-رنگ-آمیزی-دبستان.webp", "desc": "دنیای رنگ‌ها، ساده‌ترین و در عین حال موثرترین راه برای ورود به دنیای آرامش و خلاقیت کودکان است. کاربرگ رنگ‌آمیزی که پیش رو دارید، با طراحی اختصاصی و الگوهای"}, {"title": "دانلود کاربرگ رنگ آمیزی سبزیجات پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T152911.373.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T152829.624.webp", "desc": "کاربرگ رنگ آمیزی سبزیجات شامل طرح‌های مختلفی از انواع سبزیجات است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."}, {"title": "دانلود کاربرگ رنگ آمیزی میوه ها پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-32.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-3-1.webp", "desc": "کاربرگ رنگ آمیزی میوه ها شامل طرح‌های مختلفی از انواع میوه ها است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."}, {"title": "دانلود کاربرگ رنگ آمیزی نشانه (ذ &#8211; ر) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-رنگ-آمیزی-نشانه-ذ-ر-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ روز معلم پسرانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-روز-معلم-پسرانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-روز-معلم.webp", "desc": "این تصویر یک طرح کارتونی شاد و ساده برای کاربرگ روز معلم است که برای رنگ‌آمیزی طراحی شده است."}, {"title": "دانلود کاربرگ سایه ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T195020.782.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ سایه ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-سایه-ها-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T205739.669.webp", "desc": "هدف اصلی کاربرگ سایه ها پیش دبستان تقویت تمایز دیداری است؛ یعنی توانایی کودک در تشخیص شباهت‌ها و تفاوت‌های تصاویر، تنها با تمرکز بر خطوط و شکل کلی (سایه)،"}, {"title": "دانلود کاربرگ شعر و رنگ‌آمیزی عید غدیر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-شعر-و-رنگ-آمیزی-عید-غدیر-خم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-شعر-و-رنگ-آمیزی-عید-غدیر-خم.webp", "desc": "در آموزش مفاهیم مذهبی به کودکان، استفاده از ابزارهای بصری و فعالیت‌های خلاقانه مانند رنگ‌آمیزی و شعرخوانی، ماندگاری مطالب را در ذهن آن‌ها دوچندان می‌کند. عید"}, {"title": "دانلود کاربرگ فواید آب و آتش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-فواید-آب-و-آتش-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-فواید-آب-و-آتش-پیش-دبستان.webp", "desc": "برای شما بچه های دوستداشتنی، کاربرگ فواید آب و آتش پیش دبستان را تهیه کردیم.هدف اصلی از درک و گفتگو پیرامون عناصر آب و آتش، شناخت جایگاه حیاتی این دو نیروی"}, {"title": "دانلود کاربرگ لوحه نویسی اول", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-لوحه-نویسی-اول.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-لوحه-نویسی-اول.webp", "desc": "فرزند کوشا، با دقت و زیبا بنویس! 🖋️ این کاربرگ لوحه نویسی اول، آغاز مسیر خوش‌نویسی و داشتن یک دست‌خط زیبا برای فرزند دلبند شماست. با دنبال کردن نقطه‌چین‌ها و"}, {"title": "دانلود کاربرگ لوحه نویسی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-لوحه-نویسی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-لوحه-نویسی.webp", "desc": "این کاربرگ لوحه نویسی دبستان  یک صفحه تمرینی برای خوشنویسی یا خط تحریری فارسی است، که برای دانش‌آموزان سال‌های اول دبستان یا مقطع پیش‌دبستانی طراحی شده است."}, {"title": "دانلود کاربرگ لوحه نویسی نشانه ( ق و ص) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-لوحه-نویسی-نشانه-ق-و-ص-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ نشانه آ ا پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-نشانه-آ-ا-پیش-دبستانی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-نشانه-آ-ا-پیش-دبستانی.webp", "desc": "کاربرگ نشانه آ ا پیش دبستانی به آموزش اولین حرف الفبای فارسی، یعنی حرف &quot;آ&quot; اختصاص دارد. با نگاه کردن به این تصویر، به یاد روزهای شیرین دبستان و اولین قلم به"}, {"title": "دانلود کاربرگ های روز پرستار", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-های-روز-پرستار.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-های-روز-پرستار.webp", "desc": "امروز کاربرگ های روز پرستار را برای بچه های دوستداشتنی آماده کردیم.لباس سفیدشان، نماد آرامش و نجابت، و دستانشان شفابخش‌ترین مرهم است. پرستاران، این فرشتگان"}, {"title": "دانلود کاربرگ های شناخت اشکال هندسی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-های-شناخت-اشکال-هندسی.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ هوش و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-هوش-و-تمرکز-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-هوش-و-تمرکز-پیش-دبستان.webp", "desc": "این کاربرگ هوش و تمرکز پیش دبستان فرصتی عالی برای پرورش مهارت‌های شناختی و حل مسئله در کودکان شماست. هدف اصلی ما در این فعالیت ساده این است که بچه‌ها با پیدا"}, {"title": "دانلود کاربرگ واحدکار مشاغل پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-52.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ واحد کار فصل زمستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-کاربرگ-واحد-کار-فصل-زمستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ وفات حضرت فاطمه زهرا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/photo_2025-11-22_10-41-20.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ وفات حضرت معصومه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-وفات-حضرت-معصومه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-وفات-حضرت-معصومه.webp", "desc": "کاربرگ وفات حضرت معصومه، با هدف آشنایی دانش‌آموزان با شخصیت حضرت معصومه (سلام‌الله‌علیها) و انتقال مفاهیم دینی و اخلاقی در قالبی شاد و آموزشی طراحی شده است."}, {"title": "دانلود ۱۰ کاربرگ روز جهانی کودک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۱۰-کاربرگ-جذاب-روز-جهانی-کودک-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۱۰-کاربرگ-جذاب-روز-جهانی-کودک.webp", "desc": "کاربرگ روز جهانی کودک فرصتی است تا تمام توجه خود را به گران‌بهاترین دارایی‌هایمان، یعنی کودکان، معطوف کنیم. این روز صرفاً یک مناسبت تقویمی نیست؛ بلکه یادآوری"}, {"title": "دانلود ۴ کاربرگ روز جهانی پست", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۴-کاربرگ-روز-جهانی-پست-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۴-کاربرگ-رو-جهانی-پست.webp", "desc": "امروز برای شما 4 کاربرگ روز جهانی پست طراحی کردیم.این تصویر رنگ‌آمیزی پستچی یک انتخاب عالی است! پستچی‌ها قهرمانان محله‌ی ما هستند که هر روز با تلاش فراوان،"}, {"title": "دانلود ۵ کاربرگ برای ایران پیروز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-برای-ایران-پیروز.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۵ کاربرگ شناخت حیوانات اهلی و وحشی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی-1.webp", "desc": "این یک فایل آموزشی برای نوآموزان، شامل کاربرگ شناخت حیوانات اهلی و وحشی پیش دبستانی است. این مجموعه فعالیت‌ها با هدف آشنایی کودکان با دسته‌بندی حیوانات و"}, {"title": "دانلود ۵ کاربرگ لوحه نویسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-لوحه-نویسی-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۵-کاربرگ-لوحه-نویسی-پیش-دبستانی.webp", "desc": "این کاربرگ لوحه نویسی پیش دبستانی فرصتی عالی است تا مهارت‌های دست‌ورزی و دقت فرزند دلبندتان را تقویت کنید. با مشاهده‌ی دقیق شکل سمت چپ، که با خطوط راهنما و"}, {"title": "دانلود ۶ کاربرگ جذاب روز مادر ۲۰ آذر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-۶-کاربرگ-جذاب-روز-مادر-۲۰-آذر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-۶-کاربرگ-جذاب-روز-مادر-۲۰-آذر.webp", "desc": "این ۶ کاربرگ جذاب روز مادر ۲۰ آذر، فرصتی مغتنم برای ارج نهادن به مقام والای مادر و زن است. این روز مصادف با سالروز میلاد حضرت فاطمه زهرا (س)، الگوی کامل زن"}, {"title": "دانلود ۶ کاربرگ روز تربیت بدنی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۶-کاربرگ-روز-تربیت-بدنی-.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۶ کاربرگ روز کتاب و کتابخوانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۶-کاربرگ-روز-کتاب-و-کتابخوانی.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۶ کاربرگ روز دختر قابل چاپ", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۶-کاربرگ-روز-کودک-قابل-چاپ-.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۷ کاربرگ روز دانش آموز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۷-کاربرگ-روز-دانش-آموز.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۹ کاربرگ جذاب شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/دانلود-۹-کاربرگ-جذاب-شب-یلدا-.pdf", "source": "سمیه روحی"}, {"title": "دانلود ۹ کاربرگ ولادت حضرت زینب (س)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۹-کاربرگ-ولادت-حضرت-زینب-س.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۹-کاربرگ-ولادت-حضرت-زینب-س-1.webp", "desc": "کاربرگ ولادت حضرت زینب (س) را برای بچه های خوبمون تهیه کردیم. ولادت با سعادت حضرت زینب کبری (س)، پیام‌آور کربلا و الگوی جاودانه صبر و استقامت بر تمامی"}, {"title": "دانلود ۹ کاربرگ به مناسبت روز پرستار", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۹-کاربرگ-پیش-دبستانی-روز-پرستار.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دانلود-۹-کاربرگ-پیش-دبستانی-روز-پرستار.webp", "desc": "کاربرگ به مناسبت روز پرستار، روز گرامیداشت فرشتگان سپیدپوشی است که با تعهد، دلسوزی و ایثار، نور امید را در دل بیماران روشن می‌کنند. هدف اصلی پرستاری تنها"}, {"title": "دانلود 3 کاربرگ برای روز جهانی غذا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-برای-روز-جهانی-غذا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-برای-روز-جهانی-غذا.webp", "desc": "این مجموعه کاربرگ برای روز جهانی غذا، با تمرکز بر سه محور کلیدی زیر، طراحی شده‌اند تا نگرش مثبتی نسبت به غذا و زندگی سالم در کودکان ایجاد کنند:"}, {"title": "دانلود 4 کاربرگ روز روستا و عشایر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-روستا-و-عشایر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-روستا-و-عشایر.webp", "desc": "کاربرگ روز روستا و عشایر می‌تواند به عنوان ابزار آموزشی برای تدریس به کودکان در موضوعات مرتبط با زندگی روستایی و عشایری استفاده شود."}, {"title": "دست ورزی با قیچی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دست-ورزی-با-قیچی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دست-ورزی-با-قیچی-پیش-دبستانی.webp", "desc": "با این کاربرگ می توانید دست ورزی با قیچی را به پیش دبستانی ها آموزش دهید."}, {"title": "کاربرگ آموزشی دست ورزی ماز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/08_52_52-PM.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-7.webp", "desc": "کاربرگ آموزشی دست ورزی ماز پیش دبستانی با تصویر یک توله سگ کارتونی و دوست‌داشتنی در بالای صفحه، بلافاصله توجه کودکان را به خود جلب می‌کند."}, {"title": "دست ورزی مقدمات نوشتن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دست-ورزی-مقدماتی-نوشتن-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/دست-ورزی-مقدماتی-نوشتن-پیش-دبستان.webp", "desc": "این فایل یک تمرین دست ورزی مقدمات نوشتن پیش دبستان است که برای کودکان طراحی شده است. هدف از این تمرین، تقویت هماهنگی چشم و دست، کنترل حرکات ظریف انگشتان و"}, {"title": "دست ورزی و نقطه چین پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-54.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-58.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "دنلود رایگان کاربرگ ماز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-4.webp", "desc": "آیا آماده یک ماجراجویی هیجان‌انگیز هستید؟ قطار ما منتظر شماست تا آن را به مقصد نهایی‌اش برسانید! مسیر پیچیده و پر از راهروهای گوناگون است، اما با دقت و تمرکز"}, {"title": "رنگ آمیزی تصویر طوطی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T222041.701.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T222026.506.webp", "desc": "کاربرگ رنگ آمیزی تصویر طوطی پیش دبستان محیطی گرمسیری را برای کودکان پیش‌دبستانی به تصویر کشیده است."}, {"title": "رنگ آمیزی جذاب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/رنگ-آمیزی-جذاب-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "رنگ آمیزی زمین پاک پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/رنگ-آمیزی-زمین-پاک-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/رنگ-آمیزی-زمین-پاک-پیش-دبستان.webp", "desc": "این برگه‌ی رنگ آمیزی زمین پاک پیش دبستان، یک تصویر دوست‌داشتنی از کره‌ی زمین را نشان می‌دهد که به شکل شخصیت کارتونی شاد و بامزه طراحی شده است. زمین با لبخندی"}, {"title": "رنگ آمیزی فصل بهار پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5353.pdf", "source": "سمیه روحی"}, {"title": "رنگ آمیزی نقاشی هواپیما برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T230221.798.pdf", "source": "سمیه روحی"}, {"title": "رنگ آمیزی (هوش و دقت ) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-هوش-و-دقت-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-هوش-و-دقت-پیش-دبستان.webp", "desc": "رنگ آمیزی (هوش و دقت ) پیش دبستان: این کاربرگ رنگ‌آمیزی، دنیای رنگ‌ها را به روی شما باز می‌کند! آماده‌اید که با دقت و هوش خود، کلاه‌های بافتنی را به زیباترین"}, {"title": "رنگ آمیزی واحدکار خیابان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T214705.238.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T214647.207.webp", "desc": "در کاربرگ رنگ آمیزی واحدکار خیابان، کودکی در کنار خط عابر پیاده ایستاده و با دست خود به چراغ راهنمایی اشاره می‌کند. خط‌های عابر پیاده به‌صورت مشخص روی سطح"}, {"title": "رنگ آمیزی ویژه اربعین حسینی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/اربعین.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/اربعین.webp", "desc": "رنگ آمیزی ویژه اربعین حسینی پیش دبستان:  این تصویر یک صحنه فرهنگی و مذهبی را در ایران نشان می‌دهد که  مرتبط با مراسم عزاداری محرم، به ویژه ایام تاسوعا و"}, {"title": "رنگ آمیزی و یادگیری اشکال هندسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-2.webp", "desc": "رنگ آمیزی و یادگیری اشکال هندسی پیش دبستان:  این کاربرگ رنگ‌آمیزی، یک ماجراجویی جذاب در دنیای اشکال هندسی است. آماده‌اید که با توجه به راهنما، هر شکل را با"}, {"title": "رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-33.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-16.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "رنگ آمیزی پیش دبستانی زمین پاک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/رنگ-آمیزی-پیش-دبستانی-زمین-پاک.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/رنگ-آمیزی-پیش-دبستانی-زمین-پاک.webp", "desc": "این رنگ آمیزی پیش دبستانی زمین پاک یک محتوای آموزشی جذاب برای کودکان است و به آن‌ها کمک می‌کند تا با مفهوم مراقبت از محیط‌زیست آشنا شوند. در تصویر، زمین به"}, {"title": "رنگ آمیزی پیش دبستان زندگی روستایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-32.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-15.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "رنگ آمیزی پیش دبستان زندگی روستایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T235157.485.pdf", "source": "سمیه روحی"}, {"title": "رنگ امیزی آغاز سال تحصیلی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-52.pdf", "source": "سمیه روحی"}, {"title": "سوالات شفاهی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_4028-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/samp2opy.webp", "desc": "سوالات شفاهی پیش دبستانی برای کودکان پیش دبستانی طراحی شده است و هدف آن ارزیابی و تقویت مهارت‌های مختلف شناختی، زبانی و حرکتی در این گروه سنی است."}, {"title": "شعر زیبا برای عید سعید غدیر خم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/شعر-زیبا-برای-عید-سعید-غدیر-خم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/شعر-زیبا-برای-عید-سعید-غدیر-خم.webp", "desc": "عید غدیر خم، یکی از بزرگ‌ترین اعیاد ما مسلمانان و به ویژه شیعیان است. آموزش مفاهیم دینی و تاریخی به کودکان با زبان ساده و در قالب هنر، ماندگاری این آموزه‌ها"}, {"title": "دانلود رایگان کاربرگ علوم شناخت اعضای بدن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T000912.137.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T000858.935.webp", "desc": "کاربرگ شناخت اعضای بدن پیش دبستان تمرکز خود را بر روی آشنایی دانش‌آموزان با اعضای مختلف بدن انسان گذاشته است و هدف آن تقویت مهارت شناسایی و نام‌گذاری بخش‌های"}, {"title": "کاربرگ شناخت اندازه پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/photo_202y.pdf", "source": "سمیه روحی"}, {"title": "فعالیت الگویابی رنگ‌ ها پیش‌ دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/فعالیت-الگویابی-رنگ‌-ها-پیش‌-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/فعالیت-الگویابی-رنگ‌-ها-پیش‌-دبستان.webp", "desc": "فعالیت الگویابی رنگ‌ ها پیش‌ دبستان را در قالب فایل پی دی اف، رنگی و باکیفیت کاملا رایگان دانلود کنید. این کاربرگ مخصوص کودکان 5 تا 7 سال بوده و یک تمرین جذاب"}, {"title": "فعالیت دست‌ورزی پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/فعالیت-دست‌ورزی-پیش‌دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/فعالیت-دست‌ورزی-پیش‌دبستانی.webp", "desc": "این تصویر یک فعالیت دست‌ورزی پیش‌دبستانی است که با هدف تقویت مهارت دست‌ورزی، هماهنگی چشم و دست، و آمادگی برای نوشتن طراحی شده است. در این فعالیت، کودک باید"}, {"title": "آموزش لباس مناسب هر فصل برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T192126.253.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T192108.865.webp", "desc": "لباس مناسب هر فصل برای پیش دبستان درباره‌ی فصل‌های سال و لباس‌های مناسب هر فصل طراحی شده و به دانش‌آموز کمک می‌کند تفاوت شرایط آب‌وهوایی در فصل‌های مختلف را"}, {"title": "کاربرگ لوحه نویسی دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-37.pdf", "source": "سمیه روحی"}, {"title": "لوحه نویسی رایگان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/لوحه-نویسی-رایگان-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/لوحه-نویسی-رایگان-پیش-دبستان.webp", "desc": "آیا به دنبال ابزاری هستید که فرزند دلبند شما را به خوشنویسی و دست‌خط زیبا علاقه‌مند کند؟ این لوحه نویسی رایگان پیش دبستان منحصر به فرد، نه فقط یک برگه ساده،"}, {"title": "متن‌های فارغ‌التحصیلی در پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/متن-های-فارغ-التحصیلی-در-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/متن-های-فارغ-التحصیلی-در-پیش-دبستان.webp", "desc": "متن‌های فارغ‌التحصیلی در پیش‌دبستان مجموعه‌ای از متن‌ها و ایده‌های مناسب برای جشن فارغ‌التحصیلی کودکان است که می‌تواند برای برگزاری مراسم پایان دوره‌ی"}, {"title": "مجموعه رایگان واحد کار علوم اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مجموعه-واحد-کار-علوم-اول-دبستان.pdf", "source": "سمیه روحی"}, {"title": "مجموعه واحد کار آموزش خانواده فارسی اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مجموعه-واحد-کار-آموزش-خانواده-فارسی-پایه-اول.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/مجموعه-واحد-کار-آموزش-خانواده-فارسی-پایه-اول.webp", "desc": "آموزش مفاهیم مهم اجتماعی مانند خانواده، از طریق فعالیت‌های سرگرم‌کننده و بصری، در پایه اول دبستان بسیار مؤثر است. این کاربرگ آموزشی، با ارائه تصویری شاد و"}, {"title": "مجموعه کاربرگ‌های رنگ‌آمیزی و آموزشی عید قربان برای کودکان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/مجموعه-کاربرگ-های-عید-قربان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/مجموعه-کاربرگ-های-عید-قربان.webp", "desc": "با نزدیک شدن به یکی از بزرگ‌ترین اعیاد مسلمانان، یعنی عید سعید قربان، والدین و مربیان پیش‌دبستانی و دبستان به‌دنبال راه‌هایی جذاب برای آشنا کردن کودکان با"}, {"title": "مجموعه کاربرگ‌های هوش پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-هوش-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "مجموعه کاربرگ آموزش اعداد یک تا پنج", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/مجموعه-کاربرگ-آموزش-اعداد-یک-تا-پنج.pdf", "source": "سمیه روحی"}, {"title": "مجموعه کاربرگ ارتباط یابی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/مجموعه-کاربرگ-ارتباط-یابی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/مجموعه-کاربرگ-ارتباط-یابی-پیش-دبستان.webp", "desc": "این مجموعه کاربرگ ارتباط یابی پیش دبستان، یک ابزار آموزشی استاندارد و جذاب است که با هدف تقویت مهارت‌های شناختی و ذهنی کودکان در بازه سنی ۴ تا ۶ سال طراحی شده"}, {"title": "مجموعه کاربرگ عید غدیر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/مجموعه-کاربرگ-عید-غدیر.pdf", "source": "سمیه روحی"}, {"title": "مجموعه کاربرگ های هوش بگرد و پیداکن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/مجموعه-کاربرگ-های-هوش-بگرد-و-پیداکن-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "مجموعه کاربرگ های کار با قیچی و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/مجموعه-کاربرگ-های-کار-با-قیچی-و-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/مجموعه-کاربرگ-های-کار-با-قیچی-و-دست-ورزی-پیش-دبستان.webp", "desc": "اگر به دنبال یک مجموعه کاربردی و جذاب برای تقویت مهارت‌های حرکتی ظریف کودک هستید، مجموعه کاربرگ های کار با قیچی و دست ورزی پیش دبستان می‌تواند یک انتخاب عالی"}, {"title": "مجموعه کاربرگ ها به مناسبت روز پدر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/مجموعه-کاربرگ-ه-به-مناسبت-روز-پدر-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش دبستانی مهارت کمک کردن به دیگران", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-38.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-9-1.webp", "desc": "کاربرگ مهارت کمک کردن به دیگران پیش دبستان درباره‌ی مهربانی، همدلی و کمک به یکدیگر در موقعیت‌های روزمره است."}, {"title": "نقاشی با نشانه ص مثل صدف", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/ص.pdf", "source": "سمیه روحی"}, {"title": "نقاشی به مناسبت عید غدیر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/نقاشی-به-مناسبت-عید-غدیر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/نقاشی-به-مناسبت-عید-غدیر.webp", "desc": "عید غدیر خم، یکی از بزرگترین اعیاد شیعیان و فرصتی استثنایی برای آشنایی کودکان با مفهوم ولایت و محبت اهل بیت (ع) است. آموزش مفاهیم دینی به کودکان از طریق هنر و"}, {"title": "ایده نقاشی درخت برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-5-1.pdf", "source": "سمیه روحی"}, {"title": "نمونه نقاشی غواص برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T211432.303.pdf", "source": "سمیه روحی"}, {"title": "نمونه رنگ آمیزی رایگان تصویر جغد پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T222914.712.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T222856.095.webp", "desc": "کاربرگ نمونه رنگ آمیزی رایگان تصویر جغد محیط جنگل را برای کودکان پیش‌دبستانی به تصویر کشیده است."}, {"title": "نمونه سوال دست‌ ورزی ماز پیش‌ دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/نمونه-سوال-دست‌-ورزی-ماز-پیش‌-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "نمونه سوال ریاضی آشنایی با عدد یک (۱) مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/نمونه-سوال-ریاضی-آشنایی-با-عدد-یک-۱-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/نمونه-سوال-ریاضی-آشنایی-با-عدد-یک-۱-مرور-تابستان.webp", "desc": "اگر به دنبال یک نمونه سوال ریاضی آشنایی با عدد یک (۱) مرور تابستان هستید، این کاربرگ می‌تواند یکی از بهترین گزینه‌ها برای استفاده در خانه یا کلاس درس باشد."}, {"title": "نمونه واحدکار گیاهان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T012535.818.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T012459.737-1.webp", "desc": "همراهان عزیز، امروز وارد دنیای شگفت‌انگیز گیاهان می‌شویم! واحدکار گیاهان پیش دبستانی، فرصتی است تا نوگلان شما از نزدیک با رازهای رشد، تغذیه و اهمیت گل‌ها و"}, {"title": "دانلود نمونه کاربرگ بازیافت کردن زباله پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T210035.208.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ جهت ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_53541.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ حواس پنجگانه برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T193122.717.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-18T193103.626.webp", "desc": "نمونه کاربرگ حواس پنجگانه با هدف آموزش و تثبیت شناخت حواس پنج‌گانه طراحی شده است و از دانش‌آموزان می‌خواهد تا ارتباط بین اشیاء روزمره و حواس مربوطه را درک کنند."}, {"title": "نمونه کاربرگ دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5327.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5328.jpg", "desc": "نمونه کاربرگ دست ورزی یک نقاشی زنده است که کودکان را به سوی دنیای شگرف هنر و رنگ‌آمیزی فرا می‌خواند."}, {"title": "نمونه کاربرگ رایگان وسایل نقلیه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T015259.929.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T015245.150.webp", "desc": "کاربرگ رایگان وسایل نقلیه پیش دبستان، تصاویر وسایل نقلیه شامل ماشین، هواپیما، هلیکوپتر، کشتی، کامیون، قایق و قطار وغیره در یک سمت و مسیرهای مرتبط شامل هوایی،"}, {"title": "نمونه کاربرگ شناخت نان و انواع آن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T225848.103.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T225832.403.webp", "desc": "هدف کاربرگ شناخت نان و انواع آن این است که کودک همزمان با سرگرمی، تفاوت‌ها و جزئیات را یاد بگیرد و مهارت تطبیق شکل‌ها و تمرکز دیداری او تقویت شود."}, {"title": "نمونه کاربرگ فصل زمستان برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T213048.492.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T213011.998-1.webp", "desc": "این کاربرگ درباره‌ی فصل زمستان است و به نمایش ویژگی‌های این فصل سرد می‌پردازد. در تصویر، محیطی برفی دیده می‌شود که نشان‌دهنده‌ی هوای سرد و شرایط زمستانی است."}, {"title": "نمونه کاربرگ مشاغل (شغل معماری) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-16-1.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ نشانه ای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-80.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-35.webp", "desc": "فعالیت اصلی نمونه کاربرگ نشانه ای پیش دبستان"}, {"title": "نمونه کاربرگ نشانه ز برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ز-1.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ های زیبا فارغ التحصیلی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/نمونه-کاربرگ-های-زیبا-فارغ-التحصیلی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/نمونه-کاربرگ-های-زیبا-فارغ-التحصیلی-پیش-دبستان.webp", "desc": "این نمونه کاربرگ های زیبا فارغ التحصیلی پیش دبستان طراحی کردیم. طرح موجود شامل یک تصویر ساده و دوست‌داشتنی از یک چهره‌ی کارتونی شاد است که کلاه فارغ‌التحصیلی"}, {"title": "نمونه کاربرگ واحدکار دندان پزشک برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T225006.007.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T224949.441.webp", "desc": "در کاربرگ واحدکار دندان پزشک از دانش‌آموز خواسته می‌شود که تصویر مربوط به شغل دندانپزشک را با دقت مشاهده کرده و تمامی بخش‌های آن را رنگ‌آمیزی کند. دانش‌آموز"}, {"title": "نمونه کاربرگ واحدکار روز و شب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/Untitled-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T115109.868.webp", "desc": "این کاربرگ به موضوع تشخیص روز و شب اختصاص دارد و هدف آن آشنایی دانش‌آموز با تفاوت‌های محیط و فعالیت‌ها در طول روز و شب است."}, {"title": "نمونه کاربرگ واحدکار مشاغل (شغل نانوا) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-10-1.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ وسایل نقلیه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T202741.986.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T202725.011.webp", "desc": "نمونه کاربرگ وسایل نقلیه پیش دبستان، تصاویر وسایل نقلیه شامل کشتی، هواپیما، کامیون و قطار در یک سمت و مسیرهای مرتبط شامل هوایی، دریایی و زمینی در سمت دیگر"}, {"title": "نمونه کار دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دست-ورزی-1.pdf", "source": "سمیه روحی"}, {"title": "واحدکار آتش نشان برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T213805.980.pdf", "source": "سمیه روحی"}, {"title": "واحدکار اعضای بدن جانوران علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T231641.086.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T231625.189.webp", "desc": "کاربرگ واحدکار اعضای بدن جانوران آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن جانوران به کودکان پیش‌دبستانی طراحی شده است."}, {"title": "واحدکار بهداشت (حمام کردن) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T203439.615.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T203422.389.webp", "desc": "در کاربرگ واحدکار بهداشت (حمام کردن) پیش دبستان، تصویری از کودکی که در حال حمام است همراه با وسایل مختلف در اختیار دانش‌آموز قرار می‌گیرد. وسایل شامل حوله،"}, {"title": "واحدکار بهداشت فردی برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T203417.922.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T203400.129.webp", "desc": "کاربرگ واحدکار بهداشت فردی درباره‌ی مراقبت‌های شخصی و بهداشت روزانه است."}, {"title": "نمونه کاربرگ واحدکار تشخیص چشایی برای پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-23.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-26.webp", "desc": "کاربرگ واحدکار تشخیص چشایی برای پیش‌دبستان درباره‌ی آموزش حس چشایی و تشخیص طعم های خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "واحدکار حشرات برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-47.pdf", "source": "سمیه روحی"}, {"title": "واحدکار رایگان مشاغل (قاضی) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-15-1.pdf", "source": "سمیه روحی"}, {"title": "دانلود واحدکار رنگ آمیزی حشرات پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T232040.361.pdf", "source": "سمیه روحی"}, {"title": "واحدکار غذای جانوران علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T205525.136.pdf", "source": "سمیه روحی"}, {"title": "واحدکار لوازم التحریر برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-20-1.pdf", "source": "سمیه روحی"}, {"title": "واحدکار مشاغل آشنایی با شغل خیاطی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T000253.252.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T000239.060.webp", "desc": "کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی مناسب کودکان است تا با مشاهده، تحلیل و ارتباط دادن فعالیت‌ها با ابزارها و فرآیندهای شغلی، هم دانش عمومی خود را افزایش"}, {"title": "کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T221323.264.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T221257.781.webp", "desc": "در کاربرگ واحدکار مشاغل آشنایی با شغل خیاطی تصویری از یک خانم در حال خیاطی کردن ارائه شده که کودکان را به مشاهده جزئیات و درک فعالیت فرد مشغول در تصویر دعوت"}, {"title": "واحدکار مشاغل (نجاری) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-9-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-30-2.webp", "desc": "کاربرگ واحدکار مشاغل (نجاری) پیش دبستانی، یک نجار را در حال ساخت یا برش چوب با دقت و مهارت نشان می‌دهد."}, {"title": "کاربرگ واحدکار پزشک پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T153857.387.pdf", "source": "سمیه روحی"}, {"title": "واحدکار پیش دبستان آموزش عدد هشت", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحدکار-پیش-دبستان-آموزش-عدد-هشت.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحدکار-پیش-دبستان-آموزش-عدد-هشت.webp", "desc": "یادگیری ریاضی و اعداد برای کودکان پیش‌دبستانی، زمانی عمیق و ماندگار می‌شود که با بازی، نقاشی و رنگ‌آمیزی همراه باشد. این واحدکار پیش دبستان آموزش عدد هشت که"}, {"title": "واحدکار پیش دبستان رنگ آمیزی عدد نه (۹)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحدکار-پیش-دبستان-رنگ-آمیزی-عدد-نه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحدکار-پیش-دبستان-رنگ-آمیزی-عدد-نه.webp", "desc": "یکی از مهم‌ترین مراحل در آموزش ریاضی به کودکان پیش‌دبستانی، آشنایی بصری با اعداد و یادگیری شمارش آن‌هاست. ما در این بخش یک واحدکار پیش دبستان رنگ آمیزی عدد نه"}, {"title": "واحدکار پیش دبستان زندگی روستایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T130050.822.pdf", "source": "سمیه روحی"}, {"title": "واحدکار پیش دبستان زندگی روستایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T221527.218.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T221507.960.webp", "desc": "واحدکار پیش دبستان زندگی روستایی زندگی روستایی به موضوع زندگی در روستا اختصاص دارد و هدف آن آشنایی دانش‌آموز با محیط روستایی، فعالیت‌های روزمره و اجزای زندگی"}, {"title": "کاربرگ رایگان واحدکار پیش دبستان زندگی شهری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T132134.941.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان واحدکار پیش دبستان زندگی شهری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T204041.778.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T203912.556.webp", "desc": "کاربرگ واحدکار پیش دبستان زندگی شهری به موضوع زندگی در شهر اختصاص دارد و هدف آن آشنایی دانش‌آموز با محیط شهری، فعالیت‌های روزمره و اجزای زندگی در شهر است."}, {"title": "واحد کار آموزش فصل ها برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-آموزش-فصل-ها.pdf", "source": "سمیه روحی"}, {"title": "واحد کار آموزش فصل ها برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T223856.463.pdf", "source": "سمیه روحی"}, {"title": "واحد کار اتشنشان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5594.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-2-1.webp", "desc": "واحد کار آتش‌نشانی برای کودکان پیش دبستانی فرصتی مناسب است تا آن‌ها با مفهوم ایمنی و نقش آتش‌نشانان در جامعه آشنا شوند. در این واحد کار، کودکان می‌توانند از"}, {"title": "واحد کار ارتباط یابی  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-ارتباط-یابی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-ارتباط-یابی-پیش-دبستان.webp", "desc": "این واحد کار ارتباط یابی پیش دبستان یک ابزار آموزشی جذاب برای تقویت مهارت‌های شناختی کودکان است. هدف اصلی این فعالیت، &quot;ارتباط یابی&quot; است که در دستورالعمل به آن"}, {"title": "واحد کار تقارن پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تقارن-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تقارن-1.webp", "desc": "آیا به دنبال یک فعالیت آموزشی جذاب برای فرزند خود هستید؟ آموزش تقارن به کودکان یکی از مفاهیم پایه‌ای ریاضی است که با استفاده از نقاشی و بازی به راحتی قابل درک"}, {"title": "واحد کار جذاب هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-جذاب-هوش-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحدکار-جذاب-هوش-پیش-دبستان.webp", "desc": "در این واحد کار جذاب هوش پیش دبستان، کودکان با فعالیت‌های دیداری، رنگ‌آمیزی، دقت و تمرکز، طبقه‌بندی و حل مسئله آشنا می‌شوند. تمرین‌ها به‌صورت بازی‌محور طراحی"}, {"title": "واحد کار جذاب پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-جذاب-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-جذاب-پیش-دبستانی.webp", "desc": "این واحد کار جذاب پیش دبستانی با فعالیت‌های تصویری، شمارشی و مفهومی طراحی شده تا کودکان در فضایی شاد و بازی‌محور، مهارت‌های پایه را به‌صورت عمیق و ماندگار یاد"}, {"title": "واحد کار خیابان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-خیابان-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "واحد کار قوانین راهنمایی و رانندگی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-راهنمایی-و-رانندگی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-راهنمایی-و-رانندگی-پیش-دبستان.webp", "desc": "این واحد کار قوانین راهنمایی و رانندگی پیش دبستان، یک ابزار آموزشی جذاب برای تبدیل نوآموزان به عابران پیاده مسئولیت‌پذیر است! هدف اصلی این مجموعه، آموزش"}, {"title": "کاربرگ روز جهانی آتشنشانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-روز-جهانی-آتشنشانی-.pdf", "source": "سمیه روحی"}, {"title": "واحد کار رنگ آمیزی حشرات پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-رنگ-آمیزی-حشرات-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-رنگ-آمیزی-حشرات-پیش-دبستان.webp", "desc": "این واحد کار رنگ آمیزی حشرات پیش دبستان شامل تصاویری از زنبور روی گل و مورچه برای رنگ‌آمیزی و همچنین یک صفحه فعالیت برای تشخیص حشرات از سایر حیوانات است. این"}, {"title": "واحد کار رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-واحد-کار-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "واحد کار رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-رنگ-آمیزی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/واحد-کار-رنگ-آمیزی-پیش-دبستان.webp", "desc": "این واحد کار رنگ آمیزی پیش دبستان با هدف تقویت مهارت‌های پایه کودکان طراحی شده است. این فعالیت‌ جذاب به کودک کمک می‌کند تا هماهنگی چشم و دست، دقت و تمرکز، و"}, {"title": "واحد کار ریاضی و رنگ آمیزی عدد «۲» (دو) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحد-کار-ریاضی-و-رنگ-آمیزی-عدد-دو-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحد-کار-ریاضی-و-رنگ-آمیزی-عدد-دو-پیش-دبستان.webp", "desc": "آموزش اعداد به کودکان خردسال، زمانی که با بازی، نقاشی و سرگرمی همراه باشد، تأثیر و ماندگاری بسیار بیشتری خواهد داشت. در این بخش، یک واحد کار ریاضی و رنگ آمیزی"}, {"title": "واحد کار علوم حرکت جانوارن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حرکت-جانوارن-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "واحد کار علوم حس بویایی اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حس-بویایی-اول-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حس-بویایی-اول-دبستان.webp", "desc": "این واحد کار علوم حس بویایی اول دبستان یک فعالیت آموزشی ایده‌آل برای نوآموزان و دانش‌آموزان مقطع ابتدایی است که بر شناخت حس بویایی تمرکز دارد. تصویر اصلی، یک"}, {"title": "واحد کار علوم حواس پنج گانه پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حواس-پنج-گانه-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-حواس-پنج-گانه-پیش-دبستانی.webp", "desc": "حواس پنجگانه پنجره ما به سوی دنیای شگفت‌انگیز اطرافمان هستند. در این واحد کار علوم حواس پنج گانه پیش دبستانی، کودکان با چشم‌ها، گوش‌ها، بینی، زبان و پوست خود"}, {"title": "واحد کار علوم رشد جانوران اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-رشد-جانوران-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-علوم-رشد-جانوران-پیش-دبستان.webp", "desc": "واحد کار علوم رشد جانوران اول دبستان یکی از جذاب‌ترین و آموزنده‌ترین بخش‌های برنامه درسی پیش‌دبستانی است که با تمرکز بر چرخه حیات حیوانات، به‌ویژه مرغ، طراحی"}, {"title": "کاربرگ واحد کار فصل پاییز برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-فصل-پاییز-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-فصل-پاییز-برای-پیش-دبستانی.webp", "desc": "لطفاً برای دانلود فایل PDF اکاربرگ واحد کار فصل پاییز برای پیش دبستانی به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ آموزشی دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/واحد-کار-ماز-دست-ورزی-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-36.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-7-1.webp", "desc": "سفری شگفت‌انگیز از دانه تا نان! این واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی ، مراحل کامل و حیاتی تهیه نان، این نعمت الهی را به شکلی ساده و آموزنده به"}, {"title": "واحد کار مشاغل (مراحل تهیه نان) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-مشاغل-مراحل-تهیه-نان-پیش-دبستانی-.pdf", "source": "سمیه روحی"}, {"title": "واحد کار مشاغل پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/واحد-کار-مشاغل-پیش-دبستانی-.pdf", "source": "سمیه روحی"}, {"title": "واحد کار پرندگان و خزندگان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-واحد-کار-پرندگان-و-خزندگان-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-واحد-کار-پرندگان-و-خزندگان-پیش-دبستان.webp", "desc": "واحد کار پرندگان و خزندگان پیش دبستان را کاملا رایگان در سایت دکتر سمیه روحی دانلود کنید. یک فعالیت آموزشی خلاقانه و هدفمند در قالب فایل پی دی اف، سیاه و"}, {"title": "پازل اشکال هندسی ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/پازل-اشکال-هندسی-ریاضی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/پازل-اشکال-هندسی-ریاضی-پیش-دبستان.jpg", "desc": "این پازل اشکال هندسی ریاضی پیش دبستان راهنمای جامع کاربرگ ها و فعالیت های آموزشی با استفاده از کاربرگ ها و فعالیت های پازل اشکال هندسی پیش دبستانی، کودکان"}, {"title": "پيش دبستاني کاربرگ گیاهان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IMG5py.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sa656454y.webp", "desc": "این کاربرگ شش مرحله مختلف از رشد یک گیاه را نشان می دهد که برای آموزش به کودکان پیش دبستانی مناسب است. در بالا یک جدول شش خانه ای با اعداد 1 تا 6 داخل دایره ها دیده می شود."}, {"title": "پیک تابستانه دقت و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-2.webp", "desc": "پیک تابستانه دقت و تمرکز پیش دبستان:  این کاربرگ جذاب و رنگارنگ با هدف تقویت مهارت‌های دقت و تمرکز در کودکان پیش‌دبستانی طراحی شده است. فعالیت اصلی شامل وصل"}, {"title": "کاربرگ چرخه زندگی قورباغه برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T175000.992.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-19T174743.769.webp", "desc": "کاربرگ چرخه زندگی قورباغه برای پیش دبستان به موضوع چرخه‌ی زندگی قورباغه می‌پردازد و مراحل رشد این جانور را به‌صورت تصویری و مرحله‌به‌مرحله نمایش می‌دهد."}, {"title": "چهار کاربرگ به مناسبت روز کودک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/چهار-کاربرگ-به-مناسبت-روز-کودک-1-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ نقطه چین و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-5.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-5.webp", "desc": "کاربرگ نقطه چین و دست ورزی پیش دبستان:این کاربرگ آموزشی فارسی برای دانش‌آموزان پایه دوم دبستان طراحی شده است .هدف از این کاربرگ، تقویت مهارت‌های گوناگون"}, {"title": "کاربرگ‌های جذاب فارغ‌التحصیلی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ‌های-جذاب-فارغ‌التحصیلی-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ‌های حروف الفبا: آموزش الفبای فارسی با رنگ و بازی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ‌های-حروف-الفبا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ‌های-حروف-الفبا.webp", "desc": "کاربرگ‌های حروف الفبا ابزاری عالی برای والدین، مربیان مهدکودک و معلمان کلاس اول هستند تا مفاهیم پایه زبان فارسی را به کودکان آموزش دهند."}, {"title": "کاربرگهای سرگرمی و رنگ آمیزی تکنیک موزائیک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگهای-سرگرمی-و-رنگ-آمیزی-تکنیک-موزائیک-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگهای-سرگرمی-و-رنگ-آمیزی-تکنیک-موزائیک.webp", "desc": "به دنیای شگفت‌انگیز و رنگارنگ موزاییک خوش آمدید! این کاربرگهای سرگرمی و رنگ آمیزی تکنیک موزائیک فراتر از یک رنگ‌آمیزی ساده هستند؛ آن‌ها سفری به درون جزئیات"}, {"title": "کاربرگ آزمون فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IM55455454py.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sa54545py.webp", "desc": "کاربرگ آزمون فارسی پیش دبستان با استفاده از تصاویر جذاب و کلمات ساده، به کودکان کمک می‌کنند تا ارتباط بین حروف و صداهای آغازین کلمات را درک کنند."}, {"title": "کاربرگ آشنایی با آب و هوا پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-آشنایی-با-آب-و-هوا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-آشنایی-با-آب-و-هوا.webp", "desc": "این کاربرگ آشنایی با آب و هوا یک ابزار آموزشی ساده و جذاب برای کودکان پیش‌دبستانی طراحی شده است. هدف اصلی این کاربرگ آن است که کودک بتواند پدیده‌های مختلف جوی"}, {"title": "کاربرگ آشنایی با آتش و طبیعت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T220245.308.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با آتش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-50.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-21-1.webp", "desc": "کاربرگ آشنایی با آتش پیش دبستان تصویری از یک آتش را نشان می‌دهد."}, {"title": "کاربرگ آشنایی با اجزای گیاهان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-51.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با بهداشت فردی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T233010.374.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با بهداشت فردی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-آشنایی-با-بهداشت-فردی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-آشنایی-با-بهداشت-فردی-پیش-دبستانی.webp", "desc": "آموزش بهداشت فردی می‌تواند سرگرم‌کننده و جذاب باشد! این کاربرگ آشنایی با بهداشت فردی پیش دبستانی، کودکان دلبند شما را به دنیای پاکیزگی و سلامتی می‌برد. در این"}, {"title": "دانلود کاربرگ آشنایی با حواس پنجگانه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-44.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-14-1.webp", "desc": "کاربرگ آشنایی با حواس پنجگانه با هدف آشنایی دانش‌آموزان با حواس پنج‌گانه و کاربرد هر یک از آن‌ها طراحی شده است."}, {"title": "دانلود نمونه کاربرگ آشنایی با خورشید و آسمان روز برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T224300.934.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T224241.502.webp", "desc": "کاربرگ آشنایی با خورشید و آسمان به کودک نشان می‌دهد که عنصر اصلی آن خورشید است. خورشید خندان در مرکز یا بخش اصلی تصویر قرار دارد و اطراف آن ابر ها و پرنده های"}, {"title": "کاربرگ آشنایی با دایناسورها پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T234100.142.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T234045.152.webp", "desc": "کاربرگ آشنایی با دایناسورها یک برگه جهت رنگ‌آمیزی آموزشی با موضوع دایناسورها است. در کاربرگ آشنایی با دایناسورها چند دایناسور کارتونی دیده می‌شوند؛ یک"}, {"title": "دانلود کاربرگ آشنایی با سایه ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-7-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با لوازم‌تحریر و کاربردهای آن‌ ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-19-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با مشاغل (نقاش) پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-12-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با موجودات زنده و غیر زنده", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-آشنایی-با-موجودات-زنده-و-غیر-زنده.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آشنایی با نشانه ب پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-آشنایی-با-نشانه-ب-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-آشنایی-با-نشانه-ب-پیش-دبستانی.webp", "desc": "کاربرگ آشنایی با نشانه ب پیش دبستانی، با استفاده از تمرین‌های رنگ‌آمیزی و یافتن حرف «ب» در کلمات، فرآیند یادگیری را به فعالیتی سرگرم‌کننده برای کودکان تبدیل"}, {"title": "کاربرگ آشنایی با نشانه خ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/خ.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/خ.webp", "desc": "کاربرگ آشنایی با نشانه خ پیش بستان: این کاربرگ جذاب و رنگارنگ با عنوان &quot;کاربرگ نشانه خ&quot; یک ابزار آموزشی عالی برای آشنایی کودکان با صدای حرف &quot;خ&quot; در پایان کلمات"}, {"title": "کاربرگ آشنایی با نشانه (ن) فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-نشانه-ن-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-نشانه-ن-پیش-دبستان.webp", "desc": "بازی و یادگیری، بهترین ترکیب برای پرورش ذهن‌های کوچکه! کاربرگ آشنایی با نشانه (ن) فارسی پیش دبستان، راهی عالی برای آشنا کردن کودکان با صدای حرف «ن» هست. با"}, {"title": "نمونه کاربرگ آشنایی با وسایل نقلیه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T223129.318.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T223110.194.webp", "desc": "کاربرگ آشنایی با وسایل نقلیه پیش دبستان، تصاویر وسایل نقلیه شامل ماشین، هواپیما، قایق و قطار و مسیرهای مرتبط شامل هوایی، دریایی و زمینی در سمت دیگر قرار دارند."}, {"title": "کاربرگ آشنایی با پوشاک در انواع آب و هوا پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T191338.182.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T191302.382.webp", "desc": "کاربرگ آشنایی با پوشاک درباره‌ی شناخت لباس‌ها و وسایل مناسب برای شرایط مختلف آب‌وهوا است و به دانش‌آموز کمک می‌کند تفاوت بین هوای بارانی و هوای آفتابی را بهتر"}, {"title": "کاربرگ آشنایی با پوشاک در انواع آب و هوا پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T214526.952.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T214513.748.webp", "desc": "در کاربرگ آشنایی با پوشاک در انواع آب و هوا، تصاویر چهار کودک با پوشش‌های مخصوص چهار فصل در یک سمت و تصاویر آب و هوای هر فصل در سمت دیگر قرار دارند."}, {"title": "کاربرگ آماده سازی عضلات انگشتان دست بچه ها برای نوشتن", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_6295-copy.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزشی آشنایی با عدد ۳", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-آموزشی-آشنایی-با-عدد-۳.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزشی آشنایی با عدد ۴ (ویژه مرور تابستانی پیش‌دبستانی و اول دبستان)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-آموزشی-آشنایی-با-عدد-۴.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-آموزشی-آشنایی-با-عدد-۴.webp", "desc": "با نزدیک شدن به فصل تابستان، مرور مفاهیم پایه‌ی ریاضی برای کودکان اهمیت دوچندانی پیدا می‌کند. عدد «۴» یکی از اعداد کلیدی در یادگیری اولیه ریاضی است. در این"}, {"title": "کاربرگ آموزشی نشانه س پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-12.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-34.webp", "desc": "کاربرگ آموزشی نشانه س پیش دبستان با طرحی دلنشین و رنگارنگ، ابزاری عالی برای تقویت مهارت تمییز شنیداری و بصری در کودکان است."}, {"title": "کاربرگ آموزشی نشانه ش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزشی نشانه ف پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزشی نشانه م پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-7.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزشی نشانه( ه) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-11.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-33.webp", "desc": "کاربرگ آموزشی نشانه( ه) پیش دبستان:  این کاربرگ آموزشی جذاب، با طرحی شاد و کودکانه، به تقویت مهارت‌های شنیداری و تفکیک آوایی در کودکان دبستانی کمک می‌کند. در"}, {"title": "کاربرگ آموزشی نشانه پ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-1.webp", "desc": "کاربرگ آموزشی نشانه پ پیش دبستان: این کاربرگ جذاب و رنگارنگ ابزاری عالی برای آموزش کودکان پیش‌دبستانی است. در این فعالیت، کودکان تشویق می‌شوند تا اشکالی را که"}, {"title": "کاربرگ آموزشی و تمرین عدد ۸ ویژه تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-آموزشی-و-تمرین-عدد-۸-ویژه-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-آموزشی-و-تمرین-عدد-۸-ویژه-تابستان.webp", "desc": "با نزدیک شدن به فصل تابستان، مرور مفاهیم پایه‌ای ریاضی یکی از بهترین راه‌ها برای آماده‌سازی ذهن کودکان است. در این مطلب، یک کاربرگ آموزشی و تمرین عدد ۸ ویژه"}, {"title": "کاربرگ آموزش اشکال هندسی پسش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-اشکال-هندسی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود رایگان کاربرگ آموزش اشکال هندسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-ریاضی-اشکال-هندسی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش انواع آب و هوا پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-آموزش-انواع-آب-و-هوا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-آموزش-انواع-آب-و-هوا-پیش-دبستانی.webp", "desc": "این کاربرگ آموزشی برای آشنایی کودکان پیش‌دبستانی با انواع وضعیت‌های آب‌وهوا طراحی شده است.در بالای صفحه نوشته شده:&quot;نام آب و هوا را با قیچی ببر و زیر شکل آن"}, {"title": "کاربرگ آموزش جهت یابی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-جهت-یابی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/6.jpeg", "desc": "کاربرگ آموزش جهت یابی پیش دبستان یک فعالیت آموزشی جذاب و کاربردی برای تقویت مهارت‌های دیداری و درک فضایی کودکان است. در این کاربرگ، کودک با مشاهده تصویر و"}, {"title": "دانلود کاربرگ آموزش حواس پنجگانه برای پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2024/06/حواس.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش دسته بندی اعداد پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-دسته-بندی-اعداد-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-4.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش عدد ۳", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/واحد-کار-ریاضی-عدد-سه-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش عدد ۴", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-عدد-چهار.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش عدد ۵ (پنج)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آشنایی-و-تمرین-عدد-پنج.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آشنایی-و-تمرین-عدد-پنج.webp", "desc": "آموزش مفاهیم پایه ریاضی و شناخت اعداد به کودکان، زمانی بهترین نتیجه را می‌دهد که با بازی، نقاشی و سرگرمی ترکیب شود. کاربرگ آموزش عدد ۵ (پنج) که در اینجا برای"}, {"title": "کاربرگ آموزش مفهوم عقب، جلو، برای پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-آموزش-مفهوم-عقب،-جلو،-برای-پیش‌دبستانی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش مهارت دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-3.webp", "desc": "کاربرگ آموزش مهارت دست ورزی پیش دبستان: کودکان هنرمند و توانا، آماده‌اید تا با مدادهای جادویی خود، یک پرنده‌ی زیبا و دوست‌داشتنی را کامل کنید؟ در این کاربرگ"}, {"title": "کاربرگ آموزش نشانه ت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/ت.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش نشانه خ  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/خ-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش نشانه م برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-م-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ آموزش و رنگ آمیزی عدد «یک» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-و-رنگ-آمیزی-عدد-یک-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-و-رنگ-آمیزی-عدد-یک-پیش-دبستان.webp", "desc": "آموزش مفاهیم پایه ریاضی و اعداد به کودکان مهدکودک و پیش‌دبستانی، نیازمند ابزارهای جذاب، ساده و سرگرم‌کننده است. کودکان در این سنین با بازی و نقاشی ارتباط"}, {"title": "کاربرگ رنگ آمیزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1389-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/s55py.webp", "desc": "کاربرگ آموزش پیش دبستانی به طور همزمان حواس بینایی، لامسه و تفکر منطقی کودک را درگیر می‌کند."}, {"title": "کاربرگ آموزش چوب خط پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/آموزش-چوب-خط-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/آموزش-چوب-خط-پیش-دبستانی.webp", "desc": "برای دانلود فایل PDF رایگان این کاربرگ آموزش چوب خط پیش دبستانی به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ آواشناسی نشانه پ پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-65.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ اجزای مختلف هواپیما علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T203637.578.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T203619.212.webp", "desc": "کاربرگ اجزای مختلف هواپیما آموزشی جذاب و خلاقانه با هدف آموزش بخش های مختلف هواپیما به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های مختلف"}, {"title": "کاربرگ اجزای گیاهان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-اجزای-گیاهان-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-اجزای-گیاهان.webp", "desc": "کاربرگ اجزای گیاهان برای مربیان مهدکودک، والدین و آموزگاران پایه پیش‌دبستانی گزینه‌ای عالی برای آموزش علوم پایه و مفاهیم طبیعی به کودکان است."}, {"title": "کاربرگ اجزای گیاهان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T191654.661.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-18T191637.875.webp", "desc": "کاربرگ اجزای گیاهان پیش دبستان آموزشی جذاب و خلاقانه با هدف آموزش اجزای مختلف گیاه به کودکان پیش‌دبستانی طراحی شده است."}, {"title": "کاربرگ اختلاف یابی و هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54281.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ استاندارد هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-استاندارد-هوش-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-استاندارد-هوش-پیش-دبستان.webp", "desc": "کاربرگ استاندارد هوش پیش دبستان یک ابزار آموزشی هدفمند برای تقویت مهارت‌های شناختی کودکان ۴ تا ۶ سال است. این کاربرگ با تمرین‌هایی مانند تشخیص تفاوت‌ها،"}, {"title": "کاربرگ اشکال هندسی و مهارت کار با قیچی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-اشکال-هندسی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ اعداد ریاضی برای پیش دبستانی (pdf)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-اعداد-ریاضی-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-اعداد-ریاضی-برای-پیش-دبستانی.webp", "desc": "کاربرگ اعداد ریاضی برای پیش دبستانی با فرمت PDF و کیفیت بالا ارائه شده و به راحتی قابل چاپ است. همین حالا آن را به صورت رایگان دانلود کنید و لحظات آموزشی"}, {"title": "دانلود رایگان کاربرگ اعداد برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54151.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54141.jpg", "desc": "کاربرگ اعداد برای پیش دبستانی، ابزاری عالی برای آموزش مفاهیم اولیه شمارش به کودکان دبستانی است."}, {"title": "کاربرگ اعضای بدن آبزیان علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T223347.253.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T223306.254.webp", "desc": "کاربرگ اعضای بدن آبزیان آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن آبزیان به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن آبزی مانند"}, {"title": "کاربرگ اعضای بدن آبزیان علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T212828.716-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T212759.203.webp", "desc": "کاربرگ اعضای بدن آبزیان آموزشی جذاب و خلاقانه با هدف آموزش اعضای بدن آبزیان به کودکان پیش‌دبستانی طراحی شده است. در این برگه، کودک با بخش‌های بدن آبزی مانند"}, {"title": "دانلود کاربرگ اعضای بدن حشرات علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T202206.569.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ اعیاد شعبانیه دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-اعیاد-نیمه-شعبان-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ الگویابی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/⁨کاربرگ-الگو-عملکردی-⁩.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/s889py.webp", "desc": "کاربرگ ریاضی با موضوع الگوها برای کودکان پیش دبستانی طراحی شده است تا آنها را با مفهوم الگوهای منظم و مشخص آشنا کند."}, {"title": "کاربرگ اندازه گیری پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/کاربرگ-اندازه-گیری.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ انواع مشاغل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T190229.092.pdf", "source": "سمیه روحی"}, {"title": "دانلود نمونه کاربرگ بازیافت زباله پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T222209.124.pdf", "source": "سمیه روحی"}, {"title": "دانلود نمونه کاربرگ بازیافت کردن زباله پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T233823.065.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T233803.262.webp", "desc": "کاربرگ بازیافت کردن زباله، امروز فرصتی را مهیا کرده تا با فرزندان دلبندمان درباره‌ی اهمیت بازیافت و حفظ محیط زیست صحبت کنیم. بیایید به کمک این نقاشی زیبا و"}, {"title": "کاربرگ بازیافت کردن زباله پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T204033.081.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ بازی ماز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-بازی-ماز.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ برگ های پاییزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-برگ-های-پاییزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-برگ-های-پاییزی.webp", "desc": "این مجموعه کاربرگ برگ های پاییزی با تصاویر جذاب و فانتزی برگ‌های درخت، برای کودکان پیش دبستانی و مقطع مهدکودک طراحی شده است. این کاربرگ‌ها ابزاری عالی برای"}, {"title": "کاربرگ بهداشت فردی پیش‌دبستان تشخیص و تطبیق وسایل بهداشتی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-6.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ به مناسبت دهه محرم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-به-مناسبت-دهه-محرم.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ به مناسبت ولادت امام حسن عسگری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/ولادت-امام-حسن-عسکری.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/ولادت-امام-حسن-عسگری2.webp", "desc": "این کاربرگ به مناسبت ولادت امام حسن عسگری (ع) طراحی شده است. دانلود pdf رایگان"}, {"title": "کاربرگ بگرد پیدا کن مخصوص پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-بگرد-پیدا-کن-مخصوص-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-بگرد-پیدا-کن-مخصوص-پیش-دبستان.jpg", "desc": "این کاربرگ بگرد پیدا کن مخصوص پیش دبستان با موضوع زیردریایی، طراحی شده است تا کودکان پیش دبستانی را در یادگیری و شناخت حیوانات و اشیاء دریایی به چالش بکشد. در"}, {"title": "کاربرگ ب ا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/01/2e0ed308-3cb2-426f-b269-3f9fd73318bf-scaled-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه آموزش عدد یک ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-تابستانه-آموزش-عدد-یک-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه تشخیص اشکال هندسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-تشخیص-اشکال-هندسی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه تمرین دقت و تمرکز پیش‌ دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-تمرین-دقت-و-تمرکز-پیش‌-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-تمرین-دقت-و-تمرکز-پیش‌-دبستان.webp", "desc": "این کاربرگ تابستانه تمرین دقت و تمرکز پیش‌ دبستان که توسط تیم آموزشی دکتر سمیه روحی طراحی شده، با هدف تقویت هماهنگی چشم و دست و درک فضایی کودکان ۴ تا ۶ سال"}, {"title": "کاربرگ تابستانه حرف د پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-2.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه حرف ل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-3.jpg", "desc": "کاربرگ تابستانه حرف ل پیش دبستان جذاب و رنگارنگ، با عنوان «مرور تابستانه پیش‌دبستان»، به دنیای شنیداری کودکان قدم می‌گذارد و هدفش تقویت مهارت تشخیص صداها در واژگان است."}, {"title": "کاربرگ تابستانه خط راست ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/11-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/11-8.webp", "desc": "کاربرگ تابستانه خط راست ریاضی پیش دبستان – برای آموزش مفهوم خط راست به کودکان پیش‌دبستانی، بهترین روش این است که از اشیاء و تصاویر ساده استفاده کنیم و مفهوم"}, {"title": "کاربرگ تابستانه خط زمینه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_52891.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_52901.jpg", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "کاربرگ تابستانه دستورزی نقطه چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-دستورزی-نقطه-چین-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-39.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-23.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "کاربرگ دست ورزی برای پیش دبستانی | دانلود رایگان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه.webp", "desc": "کاربرگ دست ورزی برای پیش دبستانی یک ابزار آموزشی و تمرینی برای دانش‌آموزان دوره پیش‌دبستان و دبستان است که بر تقویت مهارت‌های دست‌ورزی و پیش‌نیازهای لازم برای نوشتن تمرکز دارد."}, {"title": "کاربرگ تابستانه رنگ آمیزی حرف چ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-چ-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-چ-1.webp", "desc": "کاربرگ تابستانه رنگ آمیزی حرف چ پیش دبستان: در این کاربرگ آموزشی، کودکان با چالش جالبی روبرو می‌شوند: «کوچولوی نازنین! شکل‌هایی را که صدای آخر آن‌ها &#039;چ&#039; هست"}, {"title": "کاربرگ تابستانه رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-4.webp", "desc": "کاربرگ تابستانه رنگ آمیزی پیش دبستان: این یک کاربرگ جذاب و آموزشی برای کودکان است که به آن‌ها در تقویت مهارت‌های تشخیص رنگ و اعداد کمک می‌کند. موضوع اصلی"}, {"title": "کاربرگ تابستانه شناخت و رنگ آمیزی حرف ز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ز-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ز-2.webp", "desc": "کاربرگ تابستانه شناخت و رنگ آمیزی حرف ز پیش دبستان:  این کاربرگ آموزشی یک روش عالی برای تقویت مهارت‌های شنیداری کودک و تمرکز او بر صدای آخر کلمات است. با"}, {"title": "کاربرگ تابستانه صدای اول و آخر پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-3.jpg", "desc": "کاربرگ تابستانه صدای اول و آخر پیش‌دبستانی با طراحی شاد و کودک‌پسند، به هدف تقویت مهارت‌های آواشناسی و تشخیص صدا در واژه‌ها تهیه شده است."}, {"title": "کاربرگ تابستانه لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-48.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-46.webp", "desc": "کاربرگ تابستانه لوحه نویسی پیش دبستان، فرصتی فوق‌العاده برای کودکان فراهم می‌کند تا با رنگ‌های شاد و خطوط منحنی آشنا شوند و مهارت‌های ظریف حرکتی خود را تقویت کنند."}, {"title": "کاربرگ لوحه نویسی و رنگ آمیزی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی.webp", "desc": "کاربرگ لوحه نویسی و رنگ آمیزی: این کاربرگ جذاب برای تقویت مهارت‌های لوحه نویسی و رنگ‌آمیزی در کودکان پیش‌دبستانی طراحی شده است."}, {"title": "کاربرگ تابستانه مفهوم تفاوت ها ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش1.webp", "desc": "کاربرگ تابستانه مفهوم تفاوت ها ریاضی پیش دبستان – در آموزش تفاوت بین اشکال و تصاویر به کودکان پیش‌دبستانی، مهم است که ابتدا مفهوم هر کدام را ساده و قابل فهم"}, {"title": "کاربرگ تابستانه مفهوم شباهت ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/Pish-Math-shabahat-worksheet-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-134.webp", "desc": "کاربرگ تابستانه مفهوم شباهت ریاضی پیش دبستان – آموزش شباهت ها بین تصاویر و اشکال یکی از فعالیت‌های مهم در شروع آموزش کودکان است که به تقویت توانایی تشخیص و"}, {"title": "کاربرگ تابستانه نشانه ب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-12.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-14.webp", "desc": "کاربرگ تابستانه نشانه ب پیش دبستان به کودکان کمک میکند تا با شناسایی صدای آخر کلمات، مهارتهای شنیداری و زبانی خود را تقویت کنند. در بخش اول، کودک باید شکل"}, {"title": "کاربرگ نشانه ب برای پیش دبستانی | دانلود رایگان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ب.webp", "desc": "کاربرگ نشانه ب برای پیش دبستان ابزاری عالی برای آموزش حرف &quot;ب&quot; به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ تابستانه  نشانه ت  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ت-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ت-1.webp", "desc": "کاربرگ تابستانه  نشانه ت  پیش دبستان:  این کاربرگ آموزشی، با هدف تقویت مهارت‌های تشخیص صداهای پایانی کلمات، به‌ویژه صدای «ت» در آخر کلمات، برای نوآموزان و"}, {"title": "کاربرگ تابستانه نشانه ث پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ث.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ث.webp", "desc": "کاربرگ تابستانه نشانه ث  پیش دبستان:  این کاربرگ آموزشی با هدف آشنایی نوآموزان و دانش‌آموزان پیش‌دبستانی با حرف «ث» و جایگاه آن در کلمات طراحی شده است. در بخش"}, {"title": "کاربرگ تابستانه  نشانه ج  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ج-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ج-1.webp", "desc": "کاربرگ تابستانه  نشانه ج  پیش دبستان: این کاربرگ جذاب و آموزشی برای کودکان پیش‌دبستانی  طراحی شده است تا مهارت‌های شناخت حروف و صداها را در آنها تقویت کند. در"}, {"title": "کاربرگ تابستانه نشانه ح پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ح.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ح.webp", "desc": "کاربرگ تابستانه نشانه ح پیش دبستان: کاربرگ جذاب پیش رو با عنوان «دوست خوبم! شکل‌هایی را که صدای اول آن‌ها &#039;ح&#039; است، رنگ کن»، کودکان را به دنیای پر از رنگ و"}, {"title": "کاربرگ تابستانه نشانه ر پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ر.webp", "desc": "کاربرگ تابستانه نشانه ر پیش دبستان: این کاربرگ جذاب و آموزشی با هدف معرفی و تقویت حرف &quot;ر&quot; در کودکان پیش‌دبستانی طراحی شده است. در قسمت اول، کودکان با چهار"}, {"title": "کاربرگ‌ تابستانه نشانه پ پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-پ.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-پ.webp", "desc": "کاربرگ‌ تابستانه نشانه پ پیش دبستانی:این کاربرگ آموزشی، با هدف آموزش صدای ابتدایی «پـ» طراحی شده است و مناسب کودکان پیش‌دبستانی می‌باشد. در این تمرین، کودک"}, {"title": "کاربرگ تابستانه نشانه چ پیش دبستان:", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-چ-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تابستانه هوش مرور پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-2.webp", "desc": "کاربرگ تابستانه هوش مرور پیش دبستان:  این کاربرگ یک فعالیت سرگرم‌کننده و آموزشی برای دانش‌آموزان دبستانی است که به صورت تعاملی و تصویری مهارت‌های مختلفی را"}, {"title": "کاربرگ تابستانه ویژه دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-ویژه-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-تابستانه-ویژه-دست-ورزی-پیش-دبستان.webp", "desc": "این کاربرگ تابستانه ویژه دست ورزی پیش دبستان  یک فعالیت آموزشی جذاب و دوست‌داشتنی برای کودکان است که با هدف تقویت مهارت‌های پایه‌ای در سنین پایین طراحی شده"}, {"title": "کاربرگ تابستانه پیش دبستانه (ماز)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5252.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5253.jpg", "desc": "کاربرگ تابستانه پیش دبستانه (ماز)، با یک ماز دوست‌داشتنی، کودکان را به سفری فکری برای رساندن موجودات بانمک به خانه‌ی گل‌ها و گیاهان‌شان دعوت می‌کند. با دنبال"}, {"title": "کاربرگ تاشو حواس پنجگانه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T230030.066.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T230015.298.webp", "desc": "کاربرگ تاشو حواس پنجگانه پیش دبستان یک ابزار آموزشی طراحی شده با استانداردهای روانشناسی کودک است که به صورت تخصصی برای تقویت مهارت‌های شناختی کودکان تولید شده"}, {"title": "کاربرگ تاشو و رنگ آمیزی شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-تاشو-و-رنگ-آمیزی-شب-یلدا-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-تاشو-و-رنگ-آمیزی-شب-یلدا.webp", "desc": "شب یلدا، بلندترین شب سال، پر از قصه‌ها، خاطرات و رسم و رسوم شیرین است. این کاربرگ تاشو و رنگ آمیزی شب یلدا، فرصتی عالی برای آموزش و آشنایی کودکان شما با این"}, {"title": "کاربرگ تاشو چرخه آب و مراحل تشکیل باران پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T183351.656.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-19T183326.307.webp", "desc": "این کاربرگ تاشو چرخه آب و مراحل تشکیل باران به موضوع مراحل تشکیل باران اختصاص دارد و هدف آن آشنایی دانش‌آموز با چرخه‌ی آب و بارش از طریق یک فعالیت تعاملی است."}, {"title": "کاربرگ ترتیب فعالیت‌های روزانه پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T211406.130.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T211333.859.webp", "desc": "کاربرگ ترتیب فعالیت‌های روزانه مجموعه‌ای از چهار تصویر متوالی را نشان می‌دهد که هرکدام یک فعالیت مشخص از صبح کودک را به تصویر کشیده‌اند."}, {"title": "کاربرگ تشخیصی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تشخیصی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تشخیصی-پیش-دبستان.webp", "desc": "تقویت مهارت‌های دیداری و قدرت تشخیص تفاوت‌ها، یکی از ارکان مهم در آمادگی برای یادگیری خواندن، نوشتن و ریاضیات در دوران پیش‌دبستانی است. در دنیای پر از"}, {"title": "کاربرگ تشخیص اختلاف (هوش)پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-17.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-39.webp", "desc": "کاربرگ تشخیص اختلاف (هوش) پیش دبستان یک فعالیت سرگرم‌کننده و آموزشی برای کودکان است که به تقویت دقت و تمرکز آن‌ها کمک می‌کند."}, {"title": "کاربرگ تشخیص بویایی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-21.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-24.webp", "desc": "کاربرگ تشخیص بویایی پیش دبستان درباره‌ی آموزش حس بویایی و تشخیص بوهای خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "2 کاربرگ تشخیص تفاوت برای تقویت هوش", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تشخیص-تفاوت.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تشخیص-تفاوت.webp", "desc": "کاربرگ تشخیص تفاوت تصاویر، ابزاری طلایی برای پرورش مهارت‌های شناختی فرزندان شماست. دانلود رایگان فایل pdf"}, {"title": "کاربرگ تطبیق لباس با اعضای بدن پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T215647.452.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T215632.532.webp", "desc": "کاربرگ تطبیق لباس با اعضای بدن با موضوع پوشش مناسب و آشنایی با لباس و وسایل مرتبط با بخش‌های مختلف بدن طراحی شده است."}, {"title": "کاربرگ تغذیه سالم و ناسالم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T210852.722.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T210804.818.webp", "desc": "کاربرگ تغذیه سالم و ناسالم برای پیش دبستان به موضوع تشخیص و جداسازی غذای سالم و ناسالم اختصاص دارد و بر پایه‌ی مشاهده‌ی دقیق تصاویر مواد غذایی طراحی شده است."}, {"title": "کاربرگ تغذیه ی سالم و ناسالم برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T123124.917.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T123107.544.webp", "desc": "کاربرگ تغذیه ی سالم و ناسالم برای پیش دبستان به موضوع تشخیص و جداسازی غذای سالم و ناسالم اختصاص دارد و بر پایه‌ی مشاهده‌ی دقیق تصاویر مواد غذایی طراحی شده است."}, {"title": "کاربرگ تفاوت تصاویر پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تفاوت-تصاویر-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تفاوت ها پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_6298-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/s5444y.webp", "desc": "کاربرگ تفاوت ها پیش دبستانی کمک می‌کند دقت و تمرکزت را بیشتر کنی! در هر تصویر، وسایل و شکل‌های کوچکی وجود دارد که ممکن است جا‌به‌جا شده باشند یا تغییر کرده باشند."}, {"title": "کاربرگ تقویت حافظه دیداری پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_4241-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/ااd-2-copy-2.webp", "desc": "کاربرگ تقویت حافظه دیداری ک ابزار عالی برای تقویت حافظه دیداری و هماهنگی چشم و دست در کودکان پیش‌دبستانی است."}, {"title": "دانلود رایگان کاربرگ تقویت دست ورزی | PDF قابل چاپ", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-تقویت-دست-ورزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-تقویت-دست-ورزی.webp", "desc": "کاربرگ تقویت دست ورزی برای کودکان پیش‌دبستانی و کلاس اول ابتدایی. کمک به تقویت مهارت‌های حرکتی، هماهنگی چشم و دست و افزایش دقت و تمرکز. دانلود رایگان PDF قابل چاپ ویژه معلمان و والدین."}, {"title": "کاربرگ تقویت دقت و تمرکز کودکانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5518-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/saopy.webp", "desc": "کاربرگ تقویت دقت و تمرکز کودکانه برای پیش دبستانی های عزیز طراحی شده است."}, {"title": "کاربرگ تقویت مهارت و هماهنگی چشم و دست کودکان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1387-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sam6opy.webp", "desc": "کاربرگ تقویت مهارت و هماهنگی چشم و دست طراحی شده اند که یادگیری را با بازی و سرگرمی ترکیب می کنند تا تجربه آموزشی لذتبخشی برای کودکان فراهم شود."}, {"title": "کاربرگ تقویت هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5603.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-12.webp", "desc": "تقویت هوش کودکان پیش‌دبستانی فواید فراوانی برای رشد و توسعه آنها دارد. یکی از اصلی‌ترین مزایا، افزایش توانایی حل مسئله و تفکر انتقادی است که در آینده به کودک"}, {"title": "کاربرگ تقویت هوش و تمرکز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-3.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تلفیقی رنگ آمیزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-تلفیقی-رنگ-آمیزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-تلفیقی-رنگ-آمیزی.webp", "desc": "کاربرگ تلفیقی رنگ‌آمیزی یکی از جذاب‌ترین و مؤثرترین ابزارهای آموزشی برای یادگیری از طریق بازی و هنر است. در این مجموعه، کودک با رنگ‌آمیزی تصاویر متنوع و"}, {"title": "کاربرگ تمرکز و دقت و هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-2.webp", "desc": "کاربرگ تمرکز و دقت و هوش پیش دبستان: خرگوش کوچولوی ما خیلی گرسنه‌ است و هوس هویج کرده! اما مسیر رسیدن به سبد هویج پر از پیچ و خم و راه پر پیچ و خم است. با کمک"}, {"title": "کاربرگ تمرینی ماز (دست ورزی)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز-1.webp", "desc": "کاربرگ تمرینی ماز (دست ورزی):  آیا آماده‌اید تا در یک ماجراجویی پرپیچ‌وخم به موش کوچولو کمک کنید؟ این کاربرگ جذاب، یک هزارتوی هیجان‌انگیز است که قدرت تمرکز و"}, {"title": "کاربرگ تمرینی مرور نشانه ح پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ح-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ح-1.webp", "desc": "کاربرگ تمرینی مرور نشانه ح پیش دبستان:  این کاربرگ جذاب با عنوان &quot;کاربرگ نشانه ح&quot; طراحی شده تا کودکان را به شیوه‌ای بازی‌گونه با صدای حرف &quot;ح&quot; در پایان کلمات"}, {"title": "کاربرگ تمرین دست ورزی باقیچی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-تمرین-دست-ورزی-باقیچی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-تمرین-دستورزی-باقیچی-پیش-دبستان.jpg", "desc": "این کاربرگ تمرین دست ورزی باقیچی پیش دبستان، طراحی شده برای کودکان باهوش شما، به منظور تقویت مهارت‌های دستی، هماهنگی چشم و دست و تمرکز است. با استفاده از"}, {"title": "کاربرگ تمرین دست ورزی و رنگ آمیزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تمرین دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-تمرین-دست-ورزی-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تمرین فارسی صدای اول «ج» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تمرین-فارسی-صدای-اول-ج-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-تمرین-فارسی-صدای-اول-ج-پیش-دبستان.webp", "desc": "این کاربرگ تمرین فارسی صدای اول «ج» پیش دبستان برای تقویت مهارت تشخیص صدای اول «ج» در کودکان طراحی شده است. هدف اصلی این تمرین، آشنایی کودکان با صدای ابتدایی"}, {"title": "کاربرگ تمرین لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تمرین-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تمرین-لوحه-نویسی-پیش-دبستان.webp", "desc": "🏀 کوچولوهای قهرمان و هنرمند! وقت یک بازی پر از دقت و هیجان رسید. این کاربرگ تمرین لوحه نویسی پیش دبستان با طرح یک توپ بسکتبال منتظر شماست تا با مدادهای رنگی و"}, {"title": "کاربرگ تمرین و تکرار دست ورزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/دست-ورزی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تمرین کشیدن تقارن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تقارن.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تقارن.webp", "desc": "آیا به دنبال یک فعالیت آموزشی سرگرم‌کننده و جذاب برای فرزند خود هستید؟ کاربرگ آموزش تقارن با طرح کفشدوزک، ابزاری ایده‌آل برای آشنایی کودکان با یکی از مهم‌ترین"}, {"title": "کاربرگ تم ۱۲ ریاضی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-تم-۱۲-ریاضی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-تم-۱۲-ریاضی.webp", "desc": "این کاربرگ تم ۱۲ ریاضی دبستان با طراحی شاد و استفاده از تصاویر کودکانه (لاک‌پشت، خرس، کفشدوزک و گل) به دنبال تثبیت مفاهیم اساسی تم ۱۲ ریاضی اول دبستان، یعنی"}, {"title": "نمونه کاربرگ تکمیل تصویر حیوانات (قرینه سازی) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-35.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-6-1.webp", "desc": "کاربرگ تکمیل تصویر حیوانات (قرینه سازی)، هماهنگی چشم و دست و درک مفهوم تقارن در دانش‌آموزان است."}, {"title": "کاربرگ جذاب روز درخت کاری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-جذاب-روز-درخت-کاری-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ جذاب شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T181114.119.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ جذاب شکل دایره ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-شکل-دایره-ریاضی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-شکل-دایره-ریاضی-پیش-دبستان.jpg", "desc": "این کاربرگ جذاب شکل دایره ریاضی پیش دبستان، با طراحی کارتونی و دوست‌داشتنی یک دایرهٔ خوش‌بخت، به کودکان کمک می‌کند تا با شکل دایره آشنا شوند. با استفاده از"}, {"title": "کاربرگ جذاب شکل مربع ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-شکل-مربع-ریاضی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-شکل-مربع-ریاضی-پیش-دبستان.jpg", "desc": "این کاربرگ جذاب شکل مربع ریاضی پیش دبستان، این شکل را دوست‌داشتنی و دیدنی برای کودکان پیش دبستانی معرفی می‌کند. تصویر یک مربع قرمز با چهره خوش‌بین و لبخند"}, {"title": "کاربرگ جذاب پیش دبستان دی ماه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-پیش-دبستان-دی-ماه-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-جذاب-پیش-دبستان-دی-ماه.webp", "desc": "این کاربرگ جذاب پیش دبستان دی ماه، طراحی شده برای کودکان دلبند شما، با هدف تقویت مهارت‌های شناختی، حرکتی و زبانی در محیطی سرگرم‌کننده و آموزشی. این فعالیت"}, {"title": "کاربرگ جهت ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/11.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-125.webp", "desc": "کاربرگ جهت ها پیش دبستان – کاربرگ جهت ها پیش دبستان / آموزش جهت‌ها به کودکان پیش دبستان یکی از مهم‌ترین مهارت‌هایی است که می‌تواند به آنها در درک بهتر محیط"}, {"title": "کاربرگ حافظه بینایی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-حافظه-بینایی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ حس شنوایی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-24.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-27.webp", "desc": "کاربرگ حس شنوایی پیش دبستانی درباره‌ی آموزش حس شنوایی و تشخیص صداهای خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ حس لامسه برای پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-17.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-20.webp", "desc": "کاربرگ حس لامسه پیش دبستانی درباره‌ی آموزش حس لامسه و تشخیص حس های خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ حواس پنجگانه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-حواس-پنجگانه-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-حواس-پنجگانه-پیش-دبستان.webp", "desc": "این کاربرگ حواس پنجگانه پیش دبستان، به روشی ساده و شعرگونه، نوآموزان مقطع پیش‌دبستانی را با توانایی‌های حسی خود آشنا می‌کند. محتوای اصلی کاربرگ شامل یک شعر"}, {"title": "کاربرگ حواس پنجگانه پیش دبستانی رایگان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-12.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-15.webp", "desc": "کاربرگ حواس پنجگانه پیش دبستانی با هدف آموزش و تثبیت شناخت حواس پنج‌گانه طراحی شده است و از دانش‌آموزان می‌خواهد تا ارتباط بین اشیاء روزمره و حواس مربوطه را"}, {"title": "کاربرگ حواس پنج گانه علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T190428.725.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-92.webp", "desc": "کاربرگ حواس پنج گانه علوم پیش دبستان با محوریت حواس پنج‌گانه طراحی شده است تا کودکان با انواع حواس و کاربرد هر یک به‌صورت تصویری و ملموس آشنا شوند. در سمت چپ"}, {"title": "کاربرگ حیوانات اهلی و وحشی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T184935.527.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-91.webp", "desc": "کاربرگ حیوانات اهلی و وحشی با تمرکز بر حیوانات اهلی و وحشی طراحی شده است تا کودکان به کمک تصاویر واضح، با انواع حیوانات و تفاوت‌های آن‌ها آشنا شوند. در این"}, {"title": "کاربرگ خانه تکانی برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/IMG_2760.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/IMG_2799.webp", "desc": "کاربرگ خانه تکانی برای پیش دبستان درباره‌ی مسئولیت‌پذیری و همکاری اعضای خانواده در انجام کارهای خانه است."}, {"title": "کاربرگ خانه حیوانات پیش دبستانی2", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-خانه-حیوانات-پیش-دبستانی2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-خانه-حیوانات-پیش-دبستانی2.webp", "desc": "کاربرگ خانه حیوانات پیش دبستانی2 یک ابزار آموزشی و سرگرم‌کننده عالی برای کودکان در رده سنی پیش دبستانی (3 تا 6 سال) است."}, {"title": "کاربرگ خطوط شکسته و خمیده پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-شکسته-و-خمیده.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-شکسته-و-خمیده-524x800.webp", "desc": "کاربرگ خطوط شکسته و خمیده پیش‌دبستانی با هدف تقویت هماهنگی چشم و دست، مهارت‌های حرکتی ظریف، کنترل مداد، افزایش تمرکز و آمادگی برای نوشتن طراحی شده است. کودک"}, {"title": "کاربرگ خطوط پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-پیش‌دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-خطوط-پیش‌دبستانی-627x800.webp", "desc": "در کاربرگ خطوط پیش‌دبستانی، ما چند تا تصویر بامزه داریم: یک سیب مهربان و یک پروانه خوشگل. پایین صفحه هم چند تا تصویر دیگه منتظر شما هستند: یک ستاره، یک گل، یک"}, {"title": "کاربرگ خط راست ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-4.webp", "desc": "کاربرگ خط راست ریاضی پیش دبستان – برای آموزش مفهوم خط راست به کودکان پیش‌دبستانی، بهترین روش این است که از اشیاء و تصاویر ساده استفاده کنیم و مفهوم را به شکل"}, {"title": "کاربرگ خلاق تابستانه دست ورزی و رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-خلاق-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-خلاق-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.webp", "desc": "کاربرگ خلاق تابستانه دست ورزی و رنگ آمیزی پیش دبستان یک فعالیت آموزشی جذاب و خلاقانه برای کودکان است. در این کاربرگ، کودک ابتدا شکل یک هواپیما را که در بخش"}, {"title": "کاربرگ خلاق روز مادر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-خلاق-روز-مادر_.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-خلاق-روز-مادر.webp", "desc": "روز مادر (۲۰ آذر) بهترین فرصت است تا محبت بی‌پایان خود را به شیرین‌ترین مادر دنیا نشان دهیم. این کاربرگ خلاق روز مادر، شامل یک کارت تبریک زیبا و پاکتی برای"}, {"title": "کاربرگ خلاق هوش ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-خلاق-هوش-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-خلاق-هوش-ریاضی-پیش-دبستان.jpg", "desc": "کاربرگ خلاق هوش ریاضی پیش دبستان یک فعالیت آموزشی ساده، جذاب و در عین حال هدفمند برای تقویت هوش ریاضی و مهارت دیداری کودکان در سنین پیش از دبستان و حتی"}, {"title": "کاربرگ خلاق «هوش پیش‌دبستان»", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-خلاق-هوش-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-خلاق-هوش-پیش-دبستان.webp", "desc": "کاربرگ خلاق «هوش پیش‌دبستان» با فعالیت‌های جذاب رنگ‌آمیزی، شمارش، تشخیص الگو و دقت دیداری طراحی شده تا کودکان در قالب بازی و سرگرمی، مهارت‌های ذهنی خود را"}, {"title": "کاربرگ خلاق پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-خلاق-پیش-دبستانی-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ خلاق پیش دبستان هفته آخر دی ماه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-خلاق-پیش-دبستان-هفته-اخر-دی-ماه-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-های-خلاق-پیش-دبستان-هفته-اخر-دی-ماه.webp", "desc": "این کاربرگ خلاق پیش دبستان هفته آخر دی ماه، یک ابزار آموزشی جذاب و چندگانه‌ برای کودکان پیش دبستانی است که برای روز های پایانی دی ماه طراحی شده است. این"}, {"title": "کاربرگ درک مفهوم تساوی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5287.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5288.jpg", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "دانلود رایگان کاربرگ دستورزی اول ابتدایی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/دستورزی-خوب_page-0001.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ دستورزی اول دبستان مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-دستورزی-اول-دبستان-مرور-تابستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ دستورزی نقطه چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5601.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-13.webp", "desc": "کاربرگ دستورزی نقطه چین پیش دبستان برای تقویت دستور زبان و مهارت‌های نوشتاری در کودکان پیش‌دبستانی بسیار مفید است. دلایل این امر عبارتند از:"}, {"title": "دانلود رایگان کاربرگ دست ورزی pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-دست-ورزی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-دست-ورزی-پیش-دبستانی.webp", "desc": "کاربرگ دست ورزی با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. دانلود رایگان فایل pdf قابل چاپ."}, {"title": "کاربرگ دست ورزی خطوط نقطه‌چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5250.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5251.jpg", "desc": "ین کاربرگ شاد و رنگارنگ پیش‌دبستانی، طراحی شده تا با استفاده از خطوط نقطه‌چین، مهارت‌های حرکتی ظریف کودکان را تقویت کند. ردگیری این خطوط، کودک را برای نوشتن"}, {"title": "کاربرگ دست ورزی (ماز) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54301.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_54291.jpg", "desc": "این کاربرگ آموزشی با ظرافت خاصی برای تقویت مهارت‌های دست‌ورزی و هوش دیداری کودکان طراحی گردیده است."}, {"title": "کاربرگ دست‌ ورزی ماز پیش‌ دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-دست‌-ورزی-ماز-پیش‌-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-دست‌-ورزی-ماز-پیش‌-دبستان.webp", "desc": "دانلود رایگان فایل پی دی اف رنگی و باکیفیت کاربرگ دست‌ ورزی ماز پیش‌ دبستان در سایت دکتر سمیه روحی فراهم شده است. تمرینی جذاب و هدفمند که برای تقویت هماهنگی"}, {"title": "کاربرگ دست ورزی نشانه های کلاس اول", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-نشانه-ها.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/دست-ورزی-نشانه-های-کلاس-اول.webp", "desc": "کاربرگ دست ورزی نشانه ها، ابزارهای کاربردی برای دست‌ورزی و تقویت مهارت‌های حرکتی ظریف دانش‌آموزان کلاس اول دبستان هستند که به طور مستقیم برای آموزش و تمرین"}, {"title": "کاربرگ دست ورزی نقطه چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-14.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/2-2.webp", "desc": "کاربرگ دست ورزی نقطه چین پیش دبستان: این کاربرگ زیبا با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. کودکان با دنبال کردن خطوط نقطه‌چین، شکل‌های ساده"}, {"title": "کاربرگ دست ورزی و الگوی شطرنجی ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-دست-ورزی-و-الگوی-شطرنجی-ریاضی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-دستورزی-و-الگوی-شطرنجی-ریاضی-پیش-دبستان.jpg", "desc": "این کاربرگ دست ورزی و الگوی شطرنجی ریاضی پیش دبستان، به کودکان کمک می‌کند تا مهارت‌های دستی و توجه به الگوها را در محیطی سرگرم‌کننده و آموزشی تقویت کنند. با"}, {"title": "کاربرگ دست ورزی و دقت و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5597.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-1-1.webp", "desc": "کاربرگ دست ورزی و دقت و تمرکز در بالا بردن دقت و تمرکز کودکان پیش‌دبستانی اهمیت زیادی دارد زیرا این مهارت‌ها پایه و اساس رشد شناختی و تحصیلی آینده آنان را"}, {"title": "کاربرگ دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/1-35.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-19-1.webp", "desc": "کاربرگ دست ورزی پیش دبستان برای دانش‌آموزان مقطع پیش‌دبستان طراحی شده است تا مهارت‌های حرکتی ظریف و هماهنگی چشم و دست آن‌ها را تقویت کند."}, {"title": "دانلود رایگان کاربرگ دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-1.jpg", "desc": "کاربرگ دست ورزی پیش دبستانی، با هدف تقویت مهارت‌های تشخیص آوایی و هماهنگی چشم و دست طراحی شده است."}, {"title": "کاربرگ دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-پیش-دبستانی.webp", "desc": "این کاربرگ دست ورزی پیش دبستانی با طرح رنگین‌کمان و خطوط موج‌دار نقطه‌چین، ابزاری عالی برای تقویت مهارت‌های ظریف دست و آماده‌سازی کودکان برای نوشتن است. کودک"}, {"title": "کاربرگ دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-دست-ورزی-پیس-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-دست-ورزی-پیس-دبستانی.webp", "desc": "این کاربرگ دست ورزی پیش دبستانی با طرح یک پرنده بامزه، فعالیتی جذاب و آموزشی برای کودکان پیش‌دبستانی و سال‌های ابتدایی مهدکودک است. در این کاربرگ قسمت‌های"}, {"title": "نمونه کاربرگ دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-24.webp", "desc": "نمونه کاربرگ دست ورزی یکی از بهترین روش‌ها برای تقویت مهارت‌های حرکتی ظریف و آماده‌سازی کودکان جهت نوشتن است."}, {"title": "کاربرگ تقویت دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-38.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ تمرین دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-49.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-47.webp", "desc": "کاربرگ تمرین دست ورزی پیش دبستان جذاب با تصویر بادکنک‌های شاد و خطوط دایره‌ای، فرصتی عالی برای کودکان فراهم می‌کند تا مهارت‌های حرکتی ظریف و دقت خود را تقویت کنند."}, {"title": "کاربرگ آموزشی دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-7.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-دست-ورزی-پیش-دبستان.webp", "desc": "آیا می‌دانستید که شروع مسیر تحصیلی موفق، در بازی‌های ساده و روزمره کودک شما نهفته است؟ کاربرگ دست ورزی پیش دبستان، صرفاً یک سرگرمی نیستند؛ بلکه یک پل محکم"}, {"title": "کاربرگ دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-دست-ورزی-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-دست-ورزی-دبستان.webp", "desc": "با کاربرگ دست ورزی پیش دبستان به تقویت مهارت‌های پیش‌نوشتاری او کمک کنید! این تمرین ساده، مسیری سرگرم‌کننده برای یادگیری درست گرفتن مداد و حرکت دادن آن روی"}, {"title": "کاربرگ دست ورزی کار با قیچی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-دست-ورزی-کار-با-قیچی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-دست-ورزی-کار-با-قیچی.webp", "desc": "کاربرگ دست ورزی کار با قیچی پیش دبستانی به کودکان کمک می‌کند تا مهارت‌های حرکتی و هماهنگی دست و چشم خود را تقویت کنند. در این کاربرگ، کودکان با برش اشکال"}, {"title": "کاربرگ دقت و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-6.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-6.webp", "desc": "کاربرگ دقت و تمرکز پیش دبستان:این یک کاربرگ آموزشی برای کودکان پیش‌دبستانی یا ابتدایی است که با هدف آموزش مفاهیم &quot;بلند&quot; و &quot;کوتاه&quot; طراحی شده است. در قسمت اصلی"}, {"title": "کاربرگ دقت و تمرکز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-6.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-7.jpg", "desc": "کاربرگ دقت و تمرکز پیش دبستانی به صورت خلاقانه با موضوع “تفاوت‌یابی در تصاویر”، تمرینی ویژه برای تقویت دقت و تمرکز کودکان دبستانی طراحی شده است. در این صفحه،"}, {"title": "کاربرگ دقت و تمرکز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-دقت-و-تمرکز-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-دقت-و-تمرکز-پیش-دبستان.webp", "desc": "یکی از مهارت‌های کلیدی که پایه و اساس یادگیری ریاضی و خواندن در سال‌های ابتدایی دبستان است، &quot;دقت دیداری&quot; و &quot;تفکر منطقی&quot; است.این کاربرگ دقت و تمرکز پیش دبستان،"}, {"title": "کاربرگ دنیای زیر آب و جانوران آبزی برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-30.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-1.webp", "desc": "هدف کاربرگ دنیای زیر آب و جانوران آبزی آشنایی دانش‌آموزان با عناصر ساده‌ی محیط‌های آبی همراه با تقویت مهارت‌های پایه است."}, {"title": "کاربرگ رایگان آشنایی با مشاغل (تعمیرکار)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-13-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان آشنایی با پدیده رعد و برق برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-43.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-13-1.webp", "desc": "کاربرگ رایگان آشنایی با پدیده رعد و برق با هدف آشنایی دانش‌آموزان با پدیدهٔ طبیعی رعد و برق طراحی شده است."}, {"title": "کاربرگ رایگان اجزای گیاهان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T184139.778.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان تست هوش و دقت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-3.webp", "desc": "کاربرگ رایگان تست هوش و دقت پیش‌دبستانی با عنوان «دلبندم شکل‌های زیر را در تصویر بالا پیدا کن و رنگ‌آمیزی کن» یک فعالیت آموزشی جذاب برای کودکان است."}, {"title": "کاربرگ رایگان تشخیص بینایی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-22.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-25.webp", "desc": "کاربرگ رایگان تشخیص بینایی پیش دبستان درباره‌ی آموزش حس بینایی و تشخیص تصاویر خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ رایگان تفاوت تصاویر پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رایگان-تفاوت-تصاویر-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رایگان-تفاوت-تصاویر-پیش-دبستانی.webp", "desc": "این کاربرگ رایگان تفاوت تصاویر پیش دبستانی، یک فعالیت ساده و سرگرم‌کننده برای تقویت دقت و تمرکز کودکان پیش‌دبستانی است. در این صفحه، دو تصویر کارتونی مشابه از"}, {"title": "نمونه کاربرگ رایگان حواس پنجگانه برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T201842.016.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T201829.218.webp", "desc": "کاربرگ رایگان حواس پنجگانه با هدف آموزش و تثبیت شناخت حواس پنج‌گانه طراحی شده است و از دانش‌آموزان می‌خواهد تا ارتباط بین اشیاء روزمره و حواس مربوطه را درک"}, {"title": "کاربرگ رایگان دست ورزی کار با قیچی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-رایگان-دست-ورزی-کار-با-قیچی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-رایگان-دست-ورزی-کارباقیچی-پیش-دبستان.jpg", "desc": "این کاربرگ رایگان دست ورزی کار با قیچی پیش دبستان با موضوع «ماهی‌های زیبا»، یک فعالیت جذاب و آموزشی برای کودکان است که به تقویت مهارت‌های دستی، هماهنگی چشم و"}, {"title": "کاربرگ رایگان دقت و هوش پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رایگان-دقت-و-هوش-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رایگان-دقت-و-هوش-پیش-دبستانی.webp", "desc": "این  کاربرگ رایگان دقت و هوش پیش دبستانی با هدف آموزش اسامی حیوانات و تقویت مهارت تطبیق در کودکان طراحی شده است. فلسفه اصلی این است که یادگیری از طریق بازی و"}, {"title": "دانلود کاربرگ رایگان رنگ آمیزی سبزیجات پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-33.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-4-1.webp", "desc": "کاربرگ رایگان رنگ آمیزی سبزیجات شامل طرح‌های مختلفی از انواع سبزیجات است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."}, {"title": "کاربرگ رایگان سایه ها برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-5.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-6.webp", "desc": "هدف اصلی کاربرگ رایگان سایه ها برای پیش دبستان تقویت تمایز دیداری است؛ یعنی توانایی کودک در تشخیص شباهت‌ها و تفاوت‌های تصاویر، تنها با تمرکز بر خطوط و شکل کلی"}, {"title": "کاربرگ رایگان شناخت حیوانات اهلی و وحشی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-رایگان-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-رایگان-شناخت-حیوانات-اهلی-و-وحشی-پیش-دبستانی.jpg", "desc": "این کاربرگ رایگان شناخت حیوانات اهلی و وحشی پیش دبستانی، با طراحی جذاب و رنگارنگ، به کودکان کمک می‌کند تا با حیوانات اهلی و وحشی آشنا شوند. تصویر یک بچه جوجه"}, {"title": "کاربرگ رایگان شناخت صدای (خ) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-رایگان-شناخت-صدای-خ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-رایگان-شناخت-صدای-خ-پیش-دبستان-1.webp", "desc": "یادگیری حروف الفبا با بازی و سرگرمی، دنیای کودکان را شگفت‌انگیز می‌کند. کاربرگ رایگان شناخت صدای (خ) پیش دبستان، فرصتی عالی برای آشنایی کودکان با صدای حرف «خ»"}, {"title": "کاربرگ رایگان شناخت نان و انواع آن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T204636.886.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان شناخت و پیداکردن تفاوت اشکال پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان غذای جانوران علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T234428.842.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T234412.900.webp", "desc": "کاربرگ رایگان غذای جانوران به طور مشخص روی شناخت غذای هر حیوان تمرکز دارد و دانش‌آموزان را تشویق می‌کند تا ارتباط منطقی بین حیوانات و خوراک آنها را درک کنند."}, {"title": "کاربرگ رایگان فصل تابستان برای پیش‌دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T211833.316.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان فصل زمستان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T220901.520.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T220844.291.webp", "desc": "کاربرگ رایگان فصل زمستان تصویری از فصل زمستان را نشان می‌دهد که در آن یک کودک در حال ساختن آدم برفی دیده می‌شود. حضور برف در تصویر، فضای سرد زمستانی را"}, {"title": "کاربرگ رایگان لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-2.webp", "desc": "کاربرگ رایگان لوحه نویسی پیش دبستان فرصتی عالی برای پرورش خلاقیت و تقویت مهارت‌های دست‌ورزی در کودکان شماست. از بچه‌ها بخواهید تا با وصل کردن نقطه‌چین‌ها، این"}, {"title": "کاربرگ رایگان لوحه نویسی پیش دبستان نویسی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رایگان-تمرینی-لوحه-پیش-دبستان-نویسی-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رایگان-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رایگان ماز پیش‌ دبستان ویژه تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رایگان-ماز-پیش‌-دبستان-ویژه-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رایگان-ماز-پیش‌-دبستان-ویژه-تابستان.webp", "desc": "دانلود کاربرگ رایگان ماز پیش‌ دبستان ویژه تابستان در سایت دکتر سمیه روحی فراهم شده است. تمرینی جذاب و هدفمند که برای تقویت هماهنگی چشم و دست و آمادگی نوشتن"}, {"title": "کاربرگ رایگان نقاشی مشاغل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T014131.145.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T014117.184.webp", "desc": "کاربرگ رایگان نقاشی مشاغل صحنه‌ای را نشان می‌دهد که یک کودک در دست خود شانه و قیچی دارد و مشغول آرایشگری است. تصویر به دانش‌آموز کمک می‌کند تا با فعالیت‌های"}, {"title": "کاربرگ رایگان واحدکار خزندگان برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T184306.776.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-98.webp", "desc": "این فایل کاربرگ رایگان واحدکار خزندگان پیش دبستانی است و هدفش اینه که کودک با انواع خزندگان آشنا بشه و هم‌زمان توانایی رنگ‌آمیزی، دقت دیداری و تشخیص دسته‌"}, {"title": "کاربرگ رایگان واحدکار مشاغل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T111018.517.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T110957.210.webp", "desc": "در کاربرگ رایگان واحدکار مشاغل، چند شغل مختلف در یک سمت صفحه نمایش داده شده‌اند و در مقابل آن‌ها ابزارها یا نشانه‌هایی قرار دارد که به وظایف هر شغل مربوط"}, {"title": "کاربرگ رایگان واحد کار حمل و نقل پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/واحد-کار-حمل-و-نقل-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/واحد-کار-حمل-و-نقل-پیش-دبستانی.jpg", "desc": "کاربرگ واحد کار حمل و نقل پیش دبستانی شامل واحد کار حمل و نقل پیش دبستانی است که کودکان را با انواع وسایل نقلیه در محیط‌های مختلف آشنا می‌کند. در این تصویر،"}, {"title": "دانلود کاربرگ رایگان وسایل بهداشت فردی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-46.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-16-1.webp", "desc": "کاربرگ رایگان وسایل بهداشت فردی با هدف آشنایی دانش‌آموزان با بهداشت فردی و اهمیت رعایت آن در زندگی روزمره طراحی شده است."}, {"title": "کاربرگ رایگان پازل اشکال هندسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-پازل-جورچین-اشکال-هندسی-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-پازل-جورچین-اشکال-هندسی-ریاضی-پیش-دبستان.jpg", "desc": "کاربرگ رایگان پازل اشکال هندسی پیش دبستان یک فعالیت جذاب و تقویت‌کننده مهارت‌های شناختی برای کودکان است. در این کاربرگ، اشکال هندسی به صورت حیوانات مختلف"}, {"title": "کاربرگ رایگان پیداکردن تفاوت شکل ها و رنگ آمیزی آنها", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تفاوت-و-رنگ-آمیزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/تفاوت-و-رنگ-آمیزی.webp", "desc": "کاربرگ رایگان پیداکردن تفاوت شکل ها و رنگ آمیزی آنها: این کاربرگ جذاب، یک چالش شیرین برای چشم‌های تیزبین شماست! آماده‌اید که وارد دنیای این زنبورهای بامزه"}, {"title": "کاربرگ رایگان پیروی از دستور ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-پیروی-از-دستور-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-پیروی-از-دستور-ریاضی-پیش-دبستان.jpg", "desc": "دانلود کاربرگ رایگان پیروی از دستور ریاضی پیش دبستان را در قالب فایل پی دی اف، رنگی و با کیفیت امکان پذیر است. یک کاربرگ آموزشی جذاب برای تقویت مهارت پیروی از"}, {"title": "کاربرگ رایگان پیش دبستان بهداشت دهان و اهمیت مسواک زدن", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-27.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-30.webp", "desc": "کاربرگ رایگان پیش دبستان بهداشت دهان و اهمیت مسواک زدن دانش‌آموزان را با روش صحیح تمیز کردن دندان‌ها آشنا می‌شوند."}, {"title": "کاربرگ رنگ‌آمیزی؛ ابزاری برای افزایش تمرکز و خلاقیت در کودکان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ‌آمیزی-کودکان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ‌آمیزی-کودکان.webp", "desc": "آیا به دنبال راهی هستید که همزمان با سرگرم کردن کودکان، مهارت‌های ذهنی و حرکتی آن‌ها را نیز تقویت کنید؟ هنر رنگ‌آمیزی، به ویژه طرح‌های هندسی و منظم، یکی از"}, {"title": "کاربرگ رنگ‌آمیزی حیوانات باغ وحش برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T204700.122.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T204644.487.webp", "desc": "در کاربرگ رنگ‌آمیزی حیوانات باغ وحش، مجموعه‌ای از تصاویر حیوانات باغ‌وحش شامل زرافه، فیل، شیر، میمون و خرس در اختیار دانش‌آموزان قرار می‌گیرد و از آن‌ها"}, {"title": "کاربرگ رنگ‌آمیزی حیوانات باغ وحش برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T203355.212.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T203329.837.webp", "desc": "در کاربرگ رنگ‌آمیزی حیوانات باغ وحش، مجموعه‌ای از تصاویر حیوانات باغ‌وحش شامل زرافه، اسب آبی، شیر و پنگوئن و یک آقا که در حال غذا دادن به آنها است و کودکانی"}, {"title": "کاربرگ رنگ آمیزی (انار) شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-رنگ-آمیزی-انار-شب-یلدا.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی برای روز معلم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-معلم-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-معلم-2.webp", "desc": "این فایل، یک کاربرگ رنگ آمیزی برای روز معلم است که در آن یک معلم زن به همراه چندین دانش‌آموز در کلاس درس نشان داده شده است."}, {"title": "کاربرگ رنگ آمیزی تصویر دارکوب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-23T231653.183.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-23T231635.789.webp", "desc": "در مرکز کاربرگ رنگ آمیزی تصویر دارکوب، یک دارکوب بامزه  بر روی شاخه‌ی درخت نشسته است که نگاه مهربانش می‌تواند حس صمیمیت را به کودک منتقل کند."}, {"title": "کاربرگ رنگ آمیزی تصویر طوطی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-3.webp", "desc": "کاربرگ رنگ آمیزی تصویر طوطی پیش دبستان:  این کاربرگ رنگ‌آمیزی جذاب، محیطی گرمسیری را برای کودکان پیش‌دبستانی به تصویر کشیده است. در مرکز تصویر، یک طوطی بامزه"}, {"title": "کاربرگ رنگ آمیزی جانوران دریایی علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T144422.065.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی جشن شکوفه ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-جشن-شکوفه-ها-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-جشن-شکوفه-ها-پیش-دبستان.webp", "desc": "کاربرگ رنگ آمیزی جشن شکوفه ها پیش دبستان را برای شما آماده کرده ایم.جشن شکوفه‌ها، یک آیین سنتی و دلنشین در نظام آموزشی ایران است که هر ساله، یک روز پیش از"}, {"title": "کاربرگ رنگ آمیزی جوجه تیغی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-امیزی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-امیزی-3.webp", "desc": "کاربرگ رنگ آمیزی جوجه تیغی پیش دبستان: این کاربرگ رنگ‌آمیزی بامزه، طراحی شده برای کودکان پیش‌دبستانی، تصویری دوست‌داشتنی از یک جوجه‌تیغی کوچک را به نمایش"}, {"title": "کاربرگ رنگ آمیزی حرم امام رضا(ع) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی حیوانات اهلی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ-آمیزی-حیوانات-اهلی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ-آمیزی-حیوانات-اهلی.webp", "desc": "ویژگی‌های کلیدی کاربرگ رنگ آمیزی حیوانات اهلی:"}, {"title": "کاربرگ رنگ آمیزی حیوانات برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-حیوانات.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-حیوانات.webp", "desc": "کاربرگ رنگ آمیزی حیوانات یکی از مؤثرترین ابزارهای آموزشی برای کودکان پیش دبستانی محسوب می‌شود. دانلود رایگان فایل pdf"}, {"title": "کاربرگ رنگ آمیزی حیوانات وحشی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ-آمیزی-حیوانات-وحشی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی دخترانه شب قدر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/03/کاربرگ-رنگ-آمیزی-دخترانه-شب-قدر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/03/کاربرگ-رنگ-آمیزی-دخترانه-شب-قدر-479x800.webp", "desc": "کاربرگ رنگ آمیزی دخترانه شب قدر با موضوع شب قدر برای کودکان پیش‌دبستان و پایه اول ابتدایی طراحی شده است. در این تصویر یک دختر کوچولو با چادر در حال دعا دیده"}, {"title": "کاربرگ رنگ آمیزی رنگین کمان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T141705.549.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T141525.984.webp", "desc": "کاربرگ رنگ آمیزی رنگین کمان را به دلخواه و مطابق رنگ‌های واقعی یا خلاقیت خود رنگ‌آمیزی کنید."}, {"title": "کاربرگ رنگ آمیزی روز جهانی غذا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-غذا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-غذا.webp", "desc": "کاربرگ رنگ آمیزی روز جهانی غذا کاملاً رایگان هستند و می‌توانید به صورت فایل PDF از انتهای همین صفحه دانلود کنید."}, {"title": "کاربرگ رنگ آمیزی روز درختکاری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-روز-درختکاری.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-روز-درختکاری.webp", "desc": "به مناسبت فرارسیدن روز درختکاری، کاربرگ رنگ آمیزی روز درختکاری را دانلود کنید! این فعالیت عالی برای کودکان است تا ضمن تقویت مهارت‌های حرکتی ظریف و خلاقیت خود،"}, {"title": "کاربرگ رنگ آمیزی روز درخت کاری پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی.webp", "desc": "کاربرگ رنگ آمیزی روز درخت کاری پیش دبستان: این کاربرگ زیبا با عنوان &quot;رنگ‌آمیزی روز درختکاری&quot; به مناسبت گرامیداشت این روز طراحی شده و اهمیت کاشت درخت و حفاظت"}, {"title": "کاربرگ رنگ آمیزی روز پدر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-26.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-29.webp", "desc": "کاربرگ رنگ آمیزی روز پدر برای پیش دبستانی چه کمکی می‌کنند؟"}, {"title": "کاربرگ رنگ آمیزی روز پرستار برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رنگ-آمیزی-روز-پرستار.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رنگ-آمیزی-روز-پرستار.webp", "desc": "کاربرگ رنگ آمیزی روز پرستار با طراحی ساده و کودک‌پسند، شامل یک تصویر از پرستاری خوش‌رو با پوشش اسلامی است و متونی کوتاه و احساسی نظیر:"}, {"title": "کاربرگ رنگ آمیزی روز کتاب و کتابخوانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/9e1278c5cd8adbfeff534f4ccb6fdbb6.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-روز-کتاب.webp", "desc": "کاربرگ رنگ آمیزی روز کتاب تصاویر متنوع و جذابی را شامل می‌شوند."}, {"title": "کاربرگ رنگ آمیزی روز کودک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-کودک-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-کودک.webp", "desc": "کاربرگ رنگ آمیزی روز کودک (۱۶ مهر )، فرصتی برای ورود به دنیای پاک و پرشور فرشتگان زمینی است. کودکان، سرمایه‌های اصلی و سازندگان فردای هر جامعه‌اند. این روز"}, {"title": "کاربرگ رنگ آمیزی سبزیجات پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-سبزیجات.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-سبزیجات.webp", "desc": "کاربرگ رنگ آمیزی سبزیجات شامل طرح‌های مختلفی از انواع سبزیجات و میوه‌ها است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است. این کاربرگ‌ها"}, {"title": "کاربرگ رنگ آمیزی شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T182050.703.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-88.webp", "desc": "کاربرگ رنگ آمیزی شب یلدا شامل طرح‌های متنوعی از برش‌های خندان هندوانه، نمادهای شادی‌آور یلدا و شخصیت‌های کارتونی مرتبط با این شب است. این طرح‌های ساده و جذاب"}, {"title": "کاربرگ رنگ آمیزی شغل مکانیک برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T233437.151.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T233406.705.webp", "desc": "در کاربرگ رنگ آمیزی شغل مکانیک، یک پسر مکانیک دیده می‌شود که لباس کار پوشیده، کلاه دارد و آچار در دست گرفته است. اطراف او وسایل مربوط به تعمیر خودرو دیده"}, {"title": "کاربرگ رنگ آمیزی عدد 8 پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-امیزی.webp", "desc": "کاربرگ رنگ آمیزی عدد 8 پیش دبستان: این کاربرگ رنگ‌آمیزی جذاب، با هدف آموزش عدد هشت به کودکان پیش‌دبستانی طراحی شده است. در بالای صفحه، کلمه‌ی &quot;هشت&quot; به شکل"}, {"title": "کاربرگ رنگ آمیزی عدد 9 پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-عدد-9.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-عدد-9.webp", "desc": "کاربرگ رنگ آمیزی عدد 9 پیش دبستان:  این کاربرگ آموزشی جذاب، با هدف آموزش عدد نه به کودکان پیش‌دبستانی طراحی شده است. در بخش اصلی کاربرگ، نه توت‌فرنگی با"}, {"title": "کاربرگ رنگ آمیزی عید غدیر خم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رنگ-آمیزی-عید-غدیر-خم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-رنگ-آمیزی-عید-غدیر-خم.webp", "desc": "این کاربرگ زیبا به مناسبت یکی از بزرگترین عیدهای ما، یعنی عید غدیر خم آماده شده است. در کاربرگ رنگ آمیزی عید غدیر خم که قرار است شما با سلیقه خودتان آن را به"}, {"title": "کاربرگ رنگ آمیزی ماه محرم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/1-23.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/2-5.webp", "desc": "کاربرگ رنگ آمیزی ماه محرم پیش دبستان – ماه محرم یکی از ماه‌های مهم و پرمعنای تقویم اسلامی است که در آن حادثه کربلا و واقعه حسینی اتفاق افتاده است. در این ماه"}, {"title": "کاربرگ رنگ آمیزی مشاغل (پلیس) برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-14-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی میوه ها پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-4-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-25-1.webp", "desc": "کاربرگ رنگ آمیزی میوه ها شامل طرح‌های مختلفی از انواع میوه است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."}, {"title": "کاربرگ رنگ آمیزی میوه و سبزیجات پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T223158.676.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T223125.494.webp", "desc": "کاربرگ رنگ آمیزی میوه و سبزیجات شامل طرح‌های مختلفی از انواع سبزیجات و میوه‌ها است که به طور خاص برای کودکان مقطع پیش دبستانی و مهدکودک طراحی شده است."}, {"title": "کاربرگ رنگ آمیزی نشانه (الف &#8211; ب) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-امیزی-نشانه-الف-ب-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-امیزی-نشانه-الف-ب-پیش-دبستانی.webp", "desc": "این کاربرگ رنگ آمیزی نشانه (الف - ب) پیش دبستانی، ترکیبی از رنگ‌آمیزی تصاویر (انبه و بادکنک) و رنگ‌آمیزی پازلی حروف الفبای فارسی (حروف الف و ب) هستند که برای"}, {"title": "کاربرگ رنگ آمیزی نشانه ب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-ب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-ب.webp", "desc": "کاربرگ رنگ آمیزی نشانه ب پیش دبستان: این کاربرگ به کودکان کمک میکند تا با تشخیص صداهای اول کلمات، مهارتهای زبانی خود را تقویت کنند. در بخش اول، کودک باید شکل"}, {"title": "کاربرگ رنگ آمیزی نشانه (ث &#8211; ج) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ث-ج-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ث-ج-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی نشانه (ث - ج) پیش دبستان، ابزاری عالی برای تقویت یادگیری و تمرکز در کودکان پیش‌دبستانی و کلاس اولی شما هستند. کودک با استفاده از روش &quot;رنگ"}, {"title": "کاربرگ رنگ آمیزی نشانه (خ &#8211; د) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-خ-د-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-خ-د-پیش-دبستانی.webp", "desc": "یادگیری جذاب و بازی‌گونه، هدیه ما به آینده فرزند شماست! ما کاربرگ رنگ آمیزی نشانه (خ - د) پیش دبستانی را برای فرزندان شما تهیه کرده ایم.در دنیای پرشتاب امروز،"}, {"title": "کاربرگ رنگ آمیزی نشانه خ مثل خرگوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-15.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی نشانه (ز &#8211; ژ) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ز-ژ-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ز-ژ-پیش-دبستانی.webp", "desc": "با کاربرگ رنگ آمیزی نشانه (ز - ژ) پیش دبستانی، یادگیری حروف الفبای فارسی را به یک بازی هیجان‌انگیز تبدیل کنید! این کاربرگ‌ها با تمرکز بر حروف &quot;ژ&quot; (ژاکت) و &quot;ز&quot;"}, {"title": "کاربرگ رنگ آمیزی نشانه (س &#8211; ش) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-س-ش-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-س-ش-پیش-دبستان.webp", "desc": "🎉 آموزش هیجان‌انگیز حروف فارسی با پازل رنگ‌آمیزی! 🎉 این کاربرگ رنگ آمیزی نشانه (س - ش) پیش دبستان ، راهی شاد و خلاقانه برای آشنایی و تثبیت یادگیری نشانه‌های"}, {"title": "کاربرگ رنگ آمیزی نشانه س پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-س-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی نشانه (ص &#8211; ض) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ص-ضپیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی نشانه (ط-ظ) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ط-ظ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ط-ظ-پیش-دبستان.webp", "desc": "آیا می‌دانید یادگیری حروف الفبا می‌تواند به شیرینی آبنبات‌های روی سیخ و زیبایی پرهای طاووس باشد؟ 🎨 کاربرگ رنگ آمیزی نشانه (ط-ظ) پیش دبستان امروز، با ترکیب"}, {"title": "کاربرگ رنگ آمیزی نشانه (ع-غ) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ع-غ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ع-غ-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی نشانه (ع-غ) پیش دبستان، ابزاری سرگرم‌کننده و در عین حال آموزشی برای کودکان شماست. در صفحه اول، تصاویر مرتبط با این حرف، یعنی &quot;عینک&quot;"}, {"title": "کاربرگ رنگ آمیزی نشانه (ل &#8211; م) پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ل-م-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی نشانه (ه &#8211; ی) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ه-ی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ه-ی-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی نشانه (ه - ی) پیش دبستان، گامی موثر در تقویت مهارت‌های پایه‌ای زبان‌آموزی فارسی برای نوآموزان عزیز هستند. با تصاویری شاد و دوست‌داشتنی از"}, {"title": "کاربرگ رنگ آمیزی نشانه (پ &#8211; ت) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-پ-ت-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-پ-ت-پیش-دبستان.webp", "desc": "کاربرگ رنگ آمیزی نشانه (پ - ت) پیش دبستان اینجا هستند تا یادگیری حروف را به یک ماجراجویی هیجان‌انگیز تبدیل کنند! در این مجموعه، کودکان با رمزگشایی حروف داخل"}, {"title": "کاربرگ رنگ آمیزی نشانه (چ &#8211; ح) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-چ-ح-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-چ-ح-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی نشانه (چ - ح) پیش دبستان، ابزاری جذاب و تعاملی برای آموزش الفبا به کودکان مقطع پیش‌دبستانی و کلاس اول است. طراحی آن به گونه‌ای است که"}, {"title": "کاربرگ رنگ آمیزی نشانه (ک &#8211; گ) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ک-گ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-نشانه-ک-گپیش-دبستان.webp", "desc": "بازی و یادگیری با کاربرگ‌های جذاب ما! این کاربرگ رنگ آمیزی نشانه (ک - گ) پیش دبستان، ابزاری سرگرم‌کننده برای تقویت مهارت‌های دست‌ورزی و هماهنگی چشم و دست"}, {"title": "کاربرگ رنگ آمیزی نشانه گ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-8.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-11.webp", "desc": "کاربرگ رنگ آمیزی نشانه گ پیش دبستان: این کاربرگ رنگ‌آمیزی جذاب، فرصتی عالی برای کودکان فراهم می‌کند تا خلاقیت خود را شکوفا کنند. در این تصویر دلنشین، یک گنجشک"}, {"title": "دانلود کاربرگ رنگ آمیزی واحدکار حشرات پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-48.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-18-1.webp", "desc": "کاربرگ رنگ آمیزی واحدکار حشرات شامل تصویری از کفشدوزک روی گل برای رنگ‌آمیزی است. این کاربرگ‌ ابزاری سرگرم‌کننده و آموزشی برای تقویت مهارت‌های گوناگون کودکان"}, {"title": "کاربرگ رنگ آمیزی واحد کار خزندگان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-واحد-کار-خزندگان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-واحد-کار-خزندگان.webp", "desc": "کاربرگ رنگ آمیزی واحد کار خزندگان می‌تواند به‌عنوان فعالیت کلاسی، تمرین خانه یا مکمل آموزشی در مهدکودک و پیش‌دبستانی استفاده شود و برای تکمیل درس «خزندگان»"}, {"title": "کاربرگ رنگ آمیزی ولادت امام حسن عسکری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-ولادت-امام-حسن-عسکری.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-ولادت-امام-حسن-عسکری.webp", "desc": "در کاربرگ رنگ آمیزی ولادت امام حسن عسکری، شخصیت امام حسن عسگری (ع)، دانش آموزان با شخصیت امام آشنا می شوند. دانلود رایگان فایل pdf"}, {"title": "کاربرگ رنگ آمیزی ولادت حضرت زینب (س)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-ولادت-حضرت-زینب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-ولادت-حضرت-زینب.webp", "desc": "کاربرگ رنگ آمیزی ولادت حضرت زینب برای دانش‌آموزان پیش‌دبستانی و کلاس اول به مناسبت ولادت حضرت زینب (سلام الله علیها) است."}, {"title": "کاربرگ رنگ آمیزی و آموزش اعداد پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-و-آموزش-اعداد-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی و تشخیص حرف ج پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-پیش-دبستان.webp", "desc": "کاربرگ رنگ آمیزی و تشخیص حرف ج پیش دبستان: این کاربرگ آموزشی، با هدف تقویت مهارت‌های تشخیص صداهای آغازین کلمات، به‌ویژه صدای «ج» در ابتدای کلمات، برای"}, {"title": "کاربرگ رنگ آمیزی و تشخیص حرف د پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-د.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-د.webp", "desc": "کاربرگ رنگ آمیزی و تشخیص حرف د پیش دبستان:این کاربرگ آموزشی جذاب با هدف معرفی و تمرین حرف &quot;د&quot; در پایان کلمات برای کودکان پیش‌دبستانی طراحی شده است. در بخش"}, {"title": "کاربرگ رنگ آمیزی و دست ورزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-3.webp", "desc": "کاربرگ رنگ آمیزی و دست ورزی : این کاربرگ ابزاری عالی برای تقویت مهارت‌های حرکتی ظریف و هماهنگی چشم و دست در کودکان است. با کامل کردن خط‌چین‌های مربوط به تصویر"}, {"title": "کاربرگ رنگ آمیزی و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-و-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-و-دست-ورزی-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی و دست ورزی پیش دبستان برای تقویت مهارت‌های اولیه و خلاقیت در کودکان طراحی شده است. تمرین‌های متنوع آن شامل نقاط اتصال (خط چین) برای تکمیل"}, {"title": "کاربرگ رنگ آمیزی و دقت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-3.webp", "desc": "کاربرگ رنگ آمیزی و دقت پیش دبستان: این کاربرگ آموزشی با هدف تقویت مهارت‌های رنگ‌آمیزی و دقت برای دانش‌آموزان پیش‌دبستانی طراحی شده است. این برگه شامل تصاویری"}, {"title": "کاربرگ رنگ آمیزی و هوش پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-و-هوش-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-و-هوش-پیش-دبستانی.webp", "desc": "سلام به کوچولوهای باهوش! 🎨 امروز یک بازی خیلی هیجان‌انگیز داریم. این کاربرگ رنگ آمیزی و هوش پیش دبستانی پر از شکل‌های مختلف و دوست‌داشتنی است. برای اینکه"}, {"title": "کاربرگ رنگ آمیزی پرچم کشور ایران پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-پرچم-ایران.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-پرچم-ایران.webp", "desc": "کاربرگ رنگ آمیزی پرچم کشور ایران پیش دبستان: این کاربرگ به عنوان یک ابزار آموزشی جذاب برای آشنایی دانش آموزان با مفاهیم میهن دوستی و شناخت سرزمین مادری طراحی"}, {"title": "کاربرگ رنگ آمیزی پسرانه شب قدر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/03/کاربرگ-رنگ-آمیزی-پسرانه-شب-قدر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/03/کاربرگ-رنگ-آمیزی-پسرانه-شب-قدر-431x800.webp", "desc": "کاربرگ رنگ آمیزی پسرانه شب قدر با موضوع شب‌های قدر برای کودکان پیش‌دبستان و پایه اول ابتدایی طراحی شده است. در این تصویر یک پسر کوچولو در حال دعا دیده می‌شود"}, {"title": "کاربرگ رنگ آمیزی حیوانات اهلی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_5122.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_5123.jpg", "desc": "کاربرگ رنگ آمیزی حیوانات اهلی پیش دبستان با هدف تقویت مهارت رنگ‌آمیزی و دقت در کودکان پیش‌دبستانی طراحی شده است."}, {"title": "کاربرگ رنگ آمیزی حیوانات برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5279.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5280.jpg", "desc": "کاربرگ رنگ آمیزی حیوانات دارای طراحی شاد و پر از جزئیات شامل موجودات دوست‌داشتنی مثل قورباغه‌ها، مرغابی‌ها، سنجاقک، گیاهان مردابی و نی‌هاست که در یک محیط طبیعی شاد و زنده گرد آمده‌اند."}, {"title": "کاربرگ رنگ آمیزی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-6.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-8.webp", "desc": "کاربرگ رنگ آمیزی برای پیش دبستانی با هدف تقویت مهارت‌های ظریف حرکتی، دقت و خلاقیت در کودکان طراحی شده است."}, {"title": "کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-1.webp", "desc": "کاربرگ رنگ آمیزی پیش دبستان: این کاربرگ به عنوان یک ابزار آموزشی خلاقانه برای تقویت مهارت‌های زبانی و شناختی دانش‌آموزان طراحی شده است. تمرکز اصلی آن بر روی"}, {"title": "کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-رنگ-آمیزی-پیش-دبستان.webp", "desc": "کاربرگ رنگ آمیزی پیش دبستان فقط یک تفریح نیست؛ بلکه دریچه‌ای به سوی یادگیری و رشد است! این کاربرگ جذاب، با طرح فیل بامزه خود، فرصتی عالی برای پرورش خلاقیت،"}, {"title": "کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-رنگ-آمیزی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-رنگ-آمیزی-پیش-دبستان.webp", "desc": "این کاربرگ رنگ آمیزی پیش دبستان، ترکیبی از دنیای رنگ‌ها و مهارت‌های ظریف دست است. در بخش بالایی، دسته‌گلی زیبا با طرح‌های هندسی و قلب قرار دارد که کودک را به"}, {"title": "کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-پیش-دبستان-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ رنگ آمیزی چرخه زندگی پروانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-چرخه-زندگی-پروانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-چرخه-زندگی-پروانه.webp", "desc": "کاربرگ رنگ آمیزی چرخه زندگی پروانه ویژه آشنایی دانش‌آموزان با چرخه زندگی پروانه طراحی شده است و به صورت رنگ‌آمیزی، یادگیری را برای کودکان جذاب و ماندگار"}, {"title": "کاربرگ رنگ آمیزی کارهای خوب برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ-آمیزی-کارهای-خوب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-رنگ-آمیزی-کارهای-خوب.webp", "desc": "تربیت کودکانی مسئولیت‌پذیر و مهربان، یکی از دغدغه‌های اصلی والدین و مربیان است. آموزش مفاهیم اخلاقی مثل کمک به دیگران، حفظ محیط زیست و نظم شخصی به کودکان"}, {"title": "کاربرگ رنگ آمیزی کتاب و کتابخوانی برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-11.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-14.webp", "desc": "کاربرگ رنگ آمیزی کتاب و کتابخوانی درباره‌ی صحنه‌ای است که یک کودک روی مبل کنار پنجره نشسته و در حال خواندن کتاب است، در حالی که بیرون هوا بارانی است و کنار او"}, {"title": "کاربرگ رنگ آمیزی کتاب و کتابخوانی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T014751.268.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T014738.595.webp", "desc": "کاربرگ رنگ آمیزی کتاب و کتابخوانی درباره‌ی صحنه‌ای است که یک کودک روی مبل کنار پنجره نشسته و در حال خواندن کتاب است، در حالی که بیرون هوا بارانی است و کنار او"}, {"title": "کاربرگ رنگ آمیزی کودکان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-6.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-5.webp", "desc": "کاربرگ رنگ آمیزی کودکان پیش دبستان فرصتی عالی برای رشد خلاقیت کودکان است. کودک می‌تواند با رنگ‌های مورد علاقه‌اش شخصیت بامزه موجود در نقاشی را زنده کند و"}, {"title": "کاربرگ رنگ امیزی عدد ۱۰پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/رنگ-آمیزی-2.webp", "desc": "کاربرگ رنگ امیزی عدد ۱۰پیش دبستانی: این کاربرگ جذاب با طراحی کودکانه و دوست‌داشتنی خود، ابزاری عالی برای آموزش عدد ۱۰ به خردسالان است. با حضور ۹ جوجه بانمک که"}, {"title": "کاربرگ روزانه دست ورزی و آموزش عدد ۱ برای یادگیری بهتر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IMG_0477-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/U23565-1.webp", "desc": "کاربرد کاربرگ ها جهت تمرینات مقدماتی و تکمیلی دست ورزی، درست نویسی و خوانا نویسی الفبای فارسی را برای کودکان می باشد. این کاربرگ برای آموزش حرف م می باشد."}, {"title": "کاربرگ روز جهانی عصای سفید pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-نابینایان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-عصای-سفید.webp", "desc": "برای دانلود رایگان فایل PDF کاربرگ روز جهانی عصای سفید به انتهای همین صفحه مراجعه کنید."}, {"title": "دانلود 3 کاربرگ روز جهانی غذا پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-غذا.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-غذا.webp", "desc": "3 کاربرگ روز جهانی غذا کاملاً رایگان هستند و می‌توانید به صورت فایل PDF از انتهای همین صفحه دانلود کنید."}, {"title": "کاربرگ روز جهانی کودک برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-برای-پیش-دبستانی.webp", "desc": "برای دانلود رایگان فایل PDF کاربرگ روز جهانی کودک برای پیش دبستانی به انتهای همین صفحه مراجعه کنید."}, {"title": "دانلود کاربرگ روز دامپزشکی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-دامپزشکی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-دامپزشکی.webp", "desc": "کاربران گرامی، می‌توانید برای دانلود فایل PDF این کاربرگ رنگ‌آمیزی روز دامپزشکی به صورت رایگان، به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ روز دختر برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-دختر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-دختر.webp", "desc": "کاربرگ‌ روز دختر برای پیش دبستانی یک ابزار عالی برای آموزش مفاهیم اجتماعی و فرهنگی به کودکان هستند."}, {"title": "کاربرگ روز درخت کاری 15 اسفند", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-روز-درخت-کاری-15-اسفند.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-روز-درخت-کاری-15-اسفند.webp", "desc": "تاریخ: 15 اسفند (روز درختکاری) هدف: تأکید بر اهمیت حفظ محیط زیست، افزایش فضای سبز و نقش اساسی درختان در تلطیف هوا و پایداری اکوسیستم. فعالیت‌های پیشنهادی:"}, {"title": "کاربرگ روز عصای سفید برای کودکان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-عصای-سفید-برای-کودکان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ روز مادر برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-84.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ روز معلم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-معلم-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-معلم-پیش-دبستانی.webp", "desc": "برای دریافت و دانلود فایل PDF این کاربرگ روز معلم پیش دبستانی، لطفاً به انتهای همین صفحه مراجعه کنید. نسخه قابل چاپ با کیفیت بالا آماده استفاده در کلاس یا منزل است."}, {"title": "کاربرگ روز هلال احمر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-روز-هلال-احمر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-روز-هلال-احمر.webp", "desc": "۱۸ اردیبهشت روز جهانی صلیب سرخ و هلال‌احمر است؛ روزی که به همه‌ی ما یادآوری می‌کند مهربانی و کمک‌کردن چقدر مهم و قشنگ است. در کاربرگ روز هلال احمر، بچه‌های"}, {"title": "کاربرگ روز ولادت امام حسن عسگری", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/ولادت-امام-حسن-عسگری.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/ولادت-امام-حسن-عسگری.webp", "desc": "این فایل یک کاربرگ رنگ‌آمیزی است که به مناسبت روز ولادت امام حسن عسگری (ع) طراحی شده است."}, {"title": "کاربرگ روز پدر برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T214348.297.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T214304.779.webp", "desc": "کاربرگ روز پدر برای پیش دبستانی چه کمکی می‌کنند؟"}, {"title": "کاربرگ روز پدر برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-25.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-28.webp", "desc": "کاربرگ روز پدر برای پیش دبستانی چه کمکی می‌کنند؟"}, {"title": "کاربرگ روز کریسمس پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-10.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ روز کوهنورد", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-کوهنورد.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-کوهنورد.webp", "desc": "کاربرگ روز کوهنورد را برای کوچولو هایی که طبیعت دوست دارند، آماده کردیم. ۲۹ مهر ماه، به نام روز ملی کوهنورد نامگذاری شده است. کوهنوردی ورزشی است فراتر از یک"}, {"title": "کاربرگ ریاضی آشنایی با عدد صفر مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-صفر-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-صفر-مرور-تابستان.webp", "desc": "آشنایی با مفهوم “هیچ” یا همان عدد صفر، یکی از چالش‌برانگیزترین و در عین حال شیرین‌ترین بخش‌های یادگیری ریاضی برای کودکان است. کاربرگ پیش‌رو با هدف تثبیت"}, {"title": "کاربرگ ریاضی آشنایی با عدد هفت ۷ مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-هفت-۷-مرور-تابستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ ریاضی آشنایی با عدد ۵ مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-۵-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-۵-مرور-تابستان.webp", "desc": "یادگیری اعداد، سنگ‌بنای درک مفاهیم ریاضی در کودکان است. در مسیر آموزش اعداد فارسی، عدد ۵ به دلیل شکل ظاهری خاص و کاربرد فراوانش در زندگی روزمره (مانند انگشتان"}, {"title": "کاربرگ ریاضی آشنایی با عدد ۶ مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-شش-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ریاضی-آشنایی-با-عدد-شش-مرور-تابستان.webp", "desc": "آموزش اعداد به کودکان، اولین قدم در دنیای هیجان‌انگیز ریاضیات است. اگر به دنبال یک منبع آموزشی استاندارد و در عین حال سرگرم‌کننده برای فرزند یا دانش‌آموز خود"}, {"title": "کاربرگ ریاضی لوحه نویسی اعداد", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2025-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sam5659copy.webp", "desc": "کاربرگ ریاضی لوحه نویسی اعداد با هدف آشنایی کودکان پیش‌دبستانی و سال‌های اول دبستان با نحوه صحیح نوشتن اعداد فارسی طراحی شده است."}, {"title": "کاربرگ زبان آموزی نشانه خ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-16.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-12.jpg", "desc": "کاربرگ زبان آموزی نشانه خ پیش دبستان با هدف آموزش و تقویت شناخت آوای «خ» در ابتدای کلمات، برای کودکان پیش‌دبستانی تهیه شده است. در این تمرین، نوآموز با چند"}, {"title": "کاربرگ زیبا روز شمار ماه رمضان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-زیبا-روز-شمار-ماه-رمضان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-زیبا-روز-شمار-ماه-رمضان.webp", "desc": "این کاربرگ زیبا روز شمار ماه رمضان با طراحی کودک‌پسند (ستاره‌ها، ماه و نمادهای معنوی) فرصتی عالی برای آشنایی دانش‌آموزان با روزهای ماه مبارک رمضان است. کودکان"}, {"title": "کاربرگ س", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/01/کاربرگ-س-scaled-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ سایه میوه ها برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-8-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-29-1.webp", "desc": "هدف کاربرگ سایه میوه ها آشنایی با میوه‌های مختلف و تقویت مهارت دقت و تطبیق می‌باشد."}, {"title": "کاربرگ سایه ها علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/سایه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-سایه-ها-علوم-پیش-دبستان.webp", "desc": "کاربرگ سایه ها علوم پیش دبستان برای آموزش مبحث سایه‌ها به کودکان پیش‌دبستانی، بهتر است ابتدا با یک فعالیت سرگرم‌کننده شروع کنیم. مثلاً در یک فضای تاریک و با"}, {"title": "دانلود کاربرگ سایه ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-5.webp", "desc": "هدف اصلی کاربرگ سایه ها پیش دبستان تقویت تمایز دیداری است؛ یعنی توانایی کودک در تشخیص شباهت‌ها و تفاوت‌های تصاویر، تنها با تمرکز بر خطوط و شکل کلی (سایه)،"}, {"title": "کاربرگ شطرنجی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-28.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/converted-51.webp", "desc": "☑️ برای مشاهده محصولات آموزشی دکتر سمیه روحی مخصوص پیش دبستانی ها اینجا کلیک نمایید."}, {"title": "کاربرگ شعر سلام پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/شعر-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ شناخت جانوران دریایی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T225217.814.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T225147.658.webp", "desc": "کاربرگ شناخت جانوران دریایی به شناخت و تمایز جانوران دریایی و ویژگی‌های ظاهری آن‌ها می‌پردازد. دانش‌آموز با مشاهدهٔ تصاویر واقعی یا کارتونی جانوران مانند"}, {"title": "کاربرگ شناخت حیوانات اهلی علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T184636.457.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ شناخت رسانه های جمعی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-شناخت-رسانه-های-جمعی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-شناخت-رسانه-های-جمعی-پیش-دبستان.webp", "desc": "امروز اینجا کاربرگ شناخت رسانه های جمعی را به تصویر کشیدیم: تلفن، روزنامه، رایانه و یک دستگاه موبایل هوشمند. رسانه‌های جمعی کانال‌هایی هستند که پیام‌ها را به"}, {"title": "کاربرگ شناخت نشانه د برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-د-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-د-1.webp", "desc": "کاربرگ شناخت نشانه د برای پیش دبستانی: این کاربرگ جذاب یک ابزار آموزشی عالی برای آشنایی کودکان با حرف &quot;د&quot; است. با مشاهده تصاویر زیبا و متنوعی که با صدای &quot;د&quot;"}, {"title": "کاربرگ شناخت پوشاک در انواع فصل برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T020531.335.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T020516.839.webp", "desc": "هدف کاربرگ شناخت پوشاک در انواع فصل این است که دانش‌آموز با نوع لباس‌های مناسب برای هر فصل آشنا شود و تفاوت‌های پوشش متناسب با تغییرات آب و هوایی را درک کند."}, {"title": "کاربرگ شناخت پوشش مناسب برای روز بارانی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-40.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-11-1.webp", "desc": "کاربرگ شناخت پوشش مناسب برای روز بارانی و وسایل و لباس‌های مناسب برای این نوع آب‌وهواست."}, {"title": "کاربرگ شناسایی میوه‌ها و نیمه‌های آن‌ها پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T204146.045.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T204123.481.webp", "desc": "کاربرگ شناسایی میوه‌ها درباره‌ی میوه‌ها و شناخت انواع آن‌ها است."}, {"title": "کاربرگ شکل بیضی ریاضی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-شکل-بیضی-ریاضی-یپیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ صدای اول و آخر پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-2.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ صدا آموزی نشانه آ فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-1.webp", "desc": "کاربرگ صدا آموزی نشانه آ فارسی پیش دبستان– آموزش صداآموزی و نشانه «آ» به کودکان پیش‌دبستان یکی از مراحل مهم در رشد زبانی و نگارش آنها است. در این مرحله،"}, {"title": "کاربرگ صدا آموزی نشانه پ فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-2.webp", "desc": "کاربرگ صدا آموزی نشانه پ فارسی پیش دبستان – آموزش صدای «پ» به کودکان پیش‌دبستانی نیازمند روشی مثبت، بازی‌گونه و مراقبتی است تا آنها بتوانند به راحتی و بدون"}, {"title": "کاربرگ صدا آموزی نشانه «ی» پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-صدا-آموزی-نشانه-ی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-صدا-آموزی-نشانه-ی-پیش-دبستانی.webp", "desc": "این کاربرگ صدا آموزی نشانه «ی» پیش دبستانی برای آموزش و تقویت مهارت تشخیص صدای آخر «ی» در کودکان طراحی شده است. هدف اصلی این فعالیت، آشنایی کودک با واژه‌هایی"}, {"title": "کاربرگ صدا (پ) فارسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-صدا-پ-پیش-دبستان-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/کاربرگ-صدا-پ-پیش-دبستان.webp", "desc": "آموزش حروف به کودکان، مثل کاشتن دانه در ذهن‌های کنجکاو آنهاست. کاربرگ صدا (پ) فارسی پیش دبستان، یک ابزار جذاب برای آشنایی بچه‌ها با صداهای ابتدایی کلمات است."}, {"title": "دانلود کاربرگ علوم شناخت اعضای بدن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-13.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-16.webp", "desc": "کاربرگ علوم شناخت اعضای بدن پیش دبستان تمرکز خود را بر روی آشنایی دانش‌آموزان با اعضای مختلف بدن انسان گذاشته است و هدف آن تقویت مهارت شناسایی و نام‌گذاری"}, {"title": "دانلود رایگان کاربرگ علوم شناخت اعضای بدن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-3.webp", "desc": "کاربرگ علوم شناخت اعضای بدن پیش دبستان تمرکز خود را بر روی آشنایی دانش‌آموزان با اعضای مختلف بدن انسان گذاشته است و هدف آن تقویت مهارت شناسایی و نام‌گذاری"}, {"title": "دانلود رایگان کاربرگ علوم شناخت اعضای صورت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T230823.778.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T230807.102.webp", "desc": "کاربرگ علوم شناخت اعضای صورت پیش دبستان مخصوص شما طراحی شده تا ضمن بازی و سرگرمی، با اعضای اصلی صورت و وظایف آن‌ها آشنا بشی. هدف ما اینه که مهارت‌های شناختی و"}, {"title": "کاربرگ علوم شناخت غذای جانوران", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-پیش-دبستان-غذای-جانوران.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-پیش-دبستان-غذای-جانوران.webp", "desc": "این کاربرگ علوم شناخت غذای جانوران با هدف آشنایی نوآموزان با مفاهیم اولیه علوم و به طور خاص، رژیم غذایی حیوانات مختلف طراحی شده است. هدف اصلی این فعالیت،"}, {"title": "کاربرگ علوم (کارهای خطرناک) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-کارهای-خطرناک-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-علوم-کارهای-خطرناک-پیش-دبستان.webp", "desc": "امروز کاربرگ علوم (کارهای خطرناک) پیش دبستان را برای کودکان شما تهیه کرده ایم. کودکان کنجکاو همیشه به دنبال کشف دنیای اطراف هستند، اما بعضی از اشیاء خانه"}, {"title": "کاربرگ غذای حیوانات برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IM232opy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/samp656454y.webp", "desc": "این کاربرگ یک تمرین آموزشی برای کودکان است که هدف آن تقویت مهارتهای شناختی و یادگیری ارتباط بین حیوانات و غذاهای مربوط به هر یک است."}, {"title": "کاربرگ غذای حیوانات اهلی و وحشی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/تابستانه1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/تابستانه.jpg", "desc": "کاربرگ غذای حیوانات اهلی و وحشی، پنجره ای کوچک به دنیای شگفت انگیز حیوانات باز میکند."}, {"title": "کاربرگ غذای حیوانات پیش دبستانی 2", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-غذای-حیوانات-پیش-دبستانی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-غذای-حیوانات-پیش-دبستانی-2.webp", "desc": "کاربرگ غذای حیوانات پیش دبستانی 2 یک ابزار آموزشی بسیار موثر و سرگرم‌کننده است که برای کودکان در رده سنی پیش دبستانی (3 تا 6 سال) طراحی شده است. این کاربرگ،"}, {"title": "کاربرگ فصل تابستان برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-26T215501.508.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-26T215408.681.webp", "desc": "کاربرگ فصل تابستان برای پیش دبستان تصویری از فصل تابستان را به نمایش می‌گذارد که در آن یک درخت میوه‌دار به‌عنوان عنصر اصلی تصویر دیده می‌شود. روی شاخه‌های"}, {"title": "کاربرگ فصل زمستان برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1594-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sa525opy.webp", "desc": "کاربرگ فصل زمستان برای پیش دبستانی با هدف آشنایی کودکان پیش دبستانی با ویژگی های فصل زمستان طراحی شده است."}, {"title": "دانلود کاربرگ فصل پاییز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-فصل-پاییز-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-فصل-پاییز-پیش-دبستانی.webp", "desc": "لطفاً برای دانلود فایل PDF کاربرگ فصل پاییز پیش دبستانی به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ فعالیت های روزانه یک کودک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T212212.189.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T212151.206.webp", "desc": "در کاربرگ فعالیت های روزانه یک کودک، چرخه‌ی روزانه یک کودک به شکل ساعت نمایش داده شده است و تصاویر مربوط به فعالیت‌های مختلف کودک در طول روز در اختیار"}, {"title": "کاربرگ قسمت های مختلف گیاه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-قسمت-های-مختلف-گیاه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-قسمت-های-مختلف-گیاه.webp", "desc": "کاربرگ قسمت های مختلف گیاه برای استفاده در مهدکودک‌ها، کلاس‌های آمادگی، مراکز پیش‌دبستانی و آموزش در خانه بسیار مناسب است و می‌تواند مقدمه‌ای جذاب برای آموزش"}, {"title": "کاربرگ لوحه شماره 8", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/01/14-scaled-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2024/10/14-1-566x800.jpg", "desc": "کاربرد لوحه ها جهت تمرینات مقدماتی و تکمیلی دست ورزی، درست نویسی و خوانا نویسی الفبای فارسی را برای کودکان می باشد."}, {"title": "کاربرگ لوحه نویسی پیش دبستانی pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-47.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-45.webp", "desc": "کاربرگ لوحه نویسی (دست ورزی) پیش دبستان فرصتی عالی برای کودکان فراهم می‌کند تا خلاقیت خود را شکوفا کنند و مهارت‌های حرکتی ظریف خود را تقویت نمایند."}, {"title": "کاربرگ لوحه نویسی نشانه ( د ) دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-د-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-د-دبستان.webp", "desc": "این کاربرگ لوحه نویسی نشانه ( د ) دبستان یک فرصت عالی برای تقویت مهارت‌های ظریف نوشتاری و افزایش دقت فرزند دلبند شماست. با تکرار خطوط منحنی و روان، او نه تنها"}, {"title": "کاربرگ لوحه نویسی نشانه ف پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ف-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ف-پیش-دبستان.webp", "desc": "آیا می‌خواهید فرزندتان با پایه‌ای محکم و زیبا وارد دنیای نوشتار شود؟ این کاربرگ لوحه نویسی نشانه ف پیش دبستان، کلید تقویت مهارت‌های نوشتاری کودک شماست. حرف"}, {"title": "کاربرگ لوحه نویسی نشانه (ل) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ل-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ل-پیش-دبستان.webp", "desc": "با این کاربرگ لوحه نویسی نشانه (ل) پیش دبستان، سفر فرزندتان به دنیای زیبای خط فارسی را آغاز کنید! با طراحی استاندارد و دلنشین، فرصتی عالی برای تمرین حرف &quot;ل&quot;"}, {"title": "کاربرگ لوحه نویسی نشانه ( ن ) دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ن.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-نشانه-ن.webp", "desc": "این کاربرگ لوحه نویسی نشانه ( ن ) دبستان، پایه و اساس مهارت نوشتن و خوش‌خطی فرزند دلبند شماست. با تمرکز بر تمرین خطوط منحنی و نیم‌دایره‌ای، کودک شما به تدریج"}, {"title": "کاربرگ لوحه نویسی و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/دست-ورزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/دست-ورزی.webp", "desc": "کاربرگ لوحه نویسی و دست ورزی پیش دبستان: این کاربرگ برای تقویت مهارتهای حرکتی ظریف و هماهنگی چشم و دست دانش آموزان طراحی شده است. تمرین اصلی شامل کامل کردن"}, {"title": "کاربرگ نمونه لوحه نویسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-14.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ لوحه نویسی و رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-و-رنگ-آمیزی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-لوحه-نویسی-و-رنگ-آمیزی-پیش-دبستان.webp", "desc": "این کاربرگ لوحه نویسی و رنگ آمیزی پیش دبستان برای کودکان طراحی شده تا ضمن بازی، مهارت‌های مهمی را تقویت کنند. در این فعالیت، کودک دلبند شما ابتدا باید با"}, {"title": "کاربرگ لوحه نویسی حروف و الفبا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه.webp", "desc": "کاربرگ لوحه نویسی پیش دبستان: این کاربرگ ساده و در عین حال موثر، ابزاری عالی برای تقویت مهارت‌های حرکتی ظریف و هماهنگی چشم و دست در کودکان است. با تکرار"}, {"title": "کاربرگ لوحه نویسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/لوحه-نویسی-1.webp", "desc": "کاربرگ لوحه‌نویسی پیش‌دبستانی یکی از جذاب‌ترین ابزارهای آموزشی برای نوآموزان است."}, {"title": "کاربرگ لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-1.webp", "desc": "کاربرگ لوحه نویسی پیش دبستان:این کاربرگ یک ابزار آموزشی و تمرینی برای دانش‌آموزان دوره پیش‌دبستان و دبستان است که بر تقویت مهارت‌های دست‌ورزی و پیش‌نیازهای"}, {"title": "کاربرگ لوحه نویسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-لوحه-نویسی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-لوحه-نویسی-پیش-دبستان.webp", "desc": "کاربرگ‌های خطاطی، پلی محکم برای تبدیل شدن فرزندان ما به نویسندگانی خوش‌خط و منظم هستند. این کاربرگ لوحه نویسی پیش دبستان که با دقت فراوان و متناسب با اصول"}, {"title": "کاربرگ م", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/01/کاربرگ-م2-scaled-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2024/11/کاربرگ-م3.jpg", "desc": "کاربرد کاربرگ ها جهت تمرینات مقدماتی و تکمیلی دست ورزی، درست نویسی و خوانا نویسی الفبای فارسی را برای کودکان می باشد. این کاربرگ برای آموزش حرف م می باشد."}, {"title": "کاربرگ ماز برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_2834.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/2022-copy.webp", "desc": "کاربرگ ماز برای پیش دبستان یک فعالیت سرگرم‌کننده و آموزشی برای کودکان است که به طراحی یک ماز (هزارتو) می‌پردازد."}, {"title": "کاربرگ ماز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/ماز.webp", "desc": "کاربرگ ماز پیش دبستان: آیا آماده‌اید تا در یک ماجراجویی پرپیچ‌وخم، به زنبور کوچک کمک کنید؟ این کاربرگ جذاب، یک هزارتوی هیجان‌انگیز است که قدرت حل مسئله و"}, {"title": "کاربرگ ماز پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-ماز-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-ماز-پیش-دبستانی.webp", "desc": "این کاربرگ ماز پیش دبستانی برای کودکان باهوش شما طراحی شدهاست. در این فعالیت، کودک باید به خرس کوچولو کمک کند تا از میان مسیرهای پیچ‌درپیچ عبور کرده و راه"}, {"title": "کاربرگ ماز پیش دبستانی pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-ماز-پیش-دبستانی.webp", "desc": "این فایل یک کاربرگ ماز پیش دبستانی جذاب و سرگرم‌کننده است که به طور ویژه برای کودکان مقطع پیش‌دبستانی طراحی شده است. بازی‌های ماز یکی از بهترین تمرین‌ها برای"}, {"title": "نمونه کاربرگ مراحل بهداشت دست پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-7.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ مراحل بهداشت دست پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-39.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-10-1.webp", "desc": "کاربرگ مراحل بهداشت دست پیش دبستانی درباره‌ی آموزش مراحل صحیح شستن دست‌ها به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ مراحل رشد درخت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-6-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-27-1.webp", "desc": "کاربرگ مراحل رشد درخت درباره‌ی فرایند رشد گیاه از کاشت دانه تا تبدیل شدن به درخت کامل است."}, {"title": "کاربرگ مراحل رشد درخت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-مراحل-رشد-درخت.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-مراحل-رشد-درخت.webp", "desc": "کاربرگ مراحل رشد درخت درباره‌ی فرایند رشد گیاه از کاشت دانه تا تبدیل شدن به درخت کامل است."}, {"title": "کاربرگ مراحل رشد پروانه پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-مراحل-رشد-پروانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-مراحل-رشد-پروانه.webp", "desc": "کاربرگ مراحل رشد پروانه با هدف آشنایی دانش‌آموزان با چرخه زندگی پروانه طراحی شده است. در این فعالیت، کودکان به‌صورت تصویری و جذاب با مراحل رشد پروانه شامل"}, {"title": "کاربرگ مراقبت از دهان و دندان علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked.webp", "desc": "کاربرگ مراقبت از دهان و دندان با تمرکز بر تشخیص خوراکی‌هایی که بر سلامت دندان تأثیر مثبت یا منفی دارند طراحی شده است و دانش‌آموزان را وارد یک فعالیت طبقه‌بندی"}, {"title": "کاربرگ مراقبت از دهان و دندان علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T120645.287.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T120518.383.webp", "desc": "کاربرگ مراقبت از دهان و دندان با تمرکز بر تشخیص خوراکی‌هایی که بر سلامت دندان تأثیر مثبت یا منفی دارند طراحی شده است و دانش‌آموزان را وارد یک فعالیت طبقه‌بندی"}, {"title": "کاربرگ مرور اعداد پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2252154.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/ro222y.webp", "desc": "کاربرگ مرور اعداد پیش دبستانی با فعالیت های ساده و جذاب مانند شمارش شکل ها، علامت گذاری دایره ها و پررنگ کردن اعداد نقطه چین، طراحی شده است تا کودکان پیش دبستانی را با مفاهیم پایه ریاضی آشنا کند."}, {"title": "کاربرگ مرور تابستانه برای پیش دبستانی ها", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/55555.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/s565copy.webp", "desc": "کاربرگ مرور تابستانه برای پیش دبستانی ها طراحی شده تا کودکان پیش‌دبستانی را با فعالیت‌های ساده و سرگرم‌کننده درگیر کند."}, {"title": "کاربرگ مرور فارسی صدای آخر «ج» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-فارسی-صدای-آخر-ج-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-فارسی-صدای-آخر-ج-پیش-دبستان.webp", "desc": "این کاربرگ مرور فارسی صدای آخر «ج» پیش دبستان یک تمرین هدفمند برای تقویت تشخیص صدای پایانی «ج» در کودکان است. هدف اصلی این فعالیت، آشنایی کودک با صداها در"}, {"title": "کاربرگ مرور فارسی صدای آخر «پ» پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-فارسی-صدای-اخر-پ-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ مرور ماز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-ماز-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-مرور-ماز-پیش-دبستان.webp", "desc": "این کاربرگ مرور ماز پیش دبستان طراحی شده است تا علاوه بر ایجاد هیجان و تمرکز، مهارت‌های حل مسئله و دقت دیداری آن‌ها را تقویت کند. در این فعالیت، کودک باید"}, {"title": "کاربرگ مشاغل (چشم پزشک) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-3-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-24-1.webp", "desc": "در کاربرگ مشاغل (چشم پزشک) از دانش‌آموز خواسته می‌شود که تصویر مربوط به شغل چشم پزشک را با دقت مشاهده کرده و تمامی بخش‌های آن را رنگ‌آمیزی کند."}, {"title": "نمونه کاربرگ معرفی مشاغل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5431.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5432.jpg", "desc": "در کاربرگ معرفی مشاغل پیش دبستان، تصاویری از افراد مختلف در لباس‌های کاری و با ظاهر شغل‌های گوناگون مانند غواص، نقاش، رهبر ارکستر، پزشک و تاجر به نمایش درآمده است."}, {"title": "کاربرگ مفهوم بلند و کوتاه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیس-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-6.webp", "desc": "کاربرگ مفهوم بلند و کوتاه پیش دبستان:این کاربرگ یک ابزار آموزشی ساده و مؤثر برای آموزش مفاهیم &quot;کوچک و بزرگ&quot; به کودکان است. در این کاربرگ، دو تصویر از سیب با"}, {"title": "کاربرگ مفهوم سایه ها علوم پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-3.webp", "desc": "کاربرگ مفهوم سایه ها علوم پیش دبستان – برای آموزش مبحث سایه‌ها به کودکان پیش‌دبستانی، بهتر است ابتدا با یک فعالیت سرگرم‌کننده شروع کنیم. مثلاً در یک فضای"}, {"title": "کاربرگ مفهوم سایه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-مفهوم-سایه-پیش-دبستان-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-مفهوم-سایه-پیش-دبستان-1.webp", "desc": "بازی تطبیق سایه، ابزاری آموزشی و فکری بسیار مؤثر برای کودکان پیش‌دبستانی و مهدکودک است. هدف اصلی این کاربرگ مفهوم سایه پیش دبستان تقویت تمایز دیداری است؛ یعنی"}, {"title": "کاربرگ مفهوم مشاغل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5350-1.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ مهارت اجتماعی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_3600-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sam52opy.webp", "desc": "کاربرگ مهارت اجتماعی پیش دبستانی برای کودکان پیش دبستانی طراحی شده است و هدف آن تقویت توانایی تشخیص ارتباط بین مشاغل و ابزارهای مربوط به هر کدام است."}, {"title": "نمونه کاربرگ مهارت کمک کردن به دیگران برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T205257.653.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ مهارت کمک کردن به دیگران برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T022051.511.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T022039.536.webp", "desc": "کاربرگ مهارت کمک کردن به دیگران درباره‌ی مهربانی، همدلی و کمک به سالمندان در موقعیت‌های روزمره است."}, {"title": "کاربرگ مهارت کمک کردن به دیگران پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T205609.895.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T205539.136.webp", "desc": "کاربرگ مهارت کمک کردن به دیگران پیش دبستان درباره‌ی مهربانی، همدلی و کمک به سالمندان در موقعیت‌های روزمره است."}, {"title": "کاربرگ موجودات زنده و غیر زنده پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-موجودات-زنده-و-غیر-زنده.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-موجودات-زنده-و-غیر-زنده.webp", "desc": "می‌توانید برای دانلود کاربرگ موجودات زنده و غیر زنده رایگان به صورت فایل pdf به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ موجودات زنده پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-موجودات-زنده-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-موجودات-زنده-پیش-دبستانی.webp", "desc": "کاربرگ موجودات زنده پیش دبستانی، به کودکان کمک می‌کند تا با انجام فعالیت‌های عملی و جذاب، مفهوم موجودات زنده و غیرزنده را به خوبی درک کنند."}, {"title": "کاربرگ میوه برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-برای-پیش-دبستانی.webp", "desc": "برای دانلود فایل PDF کاربرگ میوه برای پیش دبستانی به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ میوه های فصل پاییز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-های-فصل-پاییز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-های-فصل-پاییز.webp", "desc": "کاربرگ میوه های فصل پاییز برای کودکان پیش‌دبستانی طراحی شده است و هدف آن آشنایی کودک با میوه‌های مخصوص فصل پاییز و تقویت مهارت‌های دقت، تشخیص و رنگ‌آمیزی هدفمند است."}, {"title": "کاربرگ میوه ها برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-ها-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-میوه-ها-برای-پیش-دبستانی.webp", "desc": "برای دانلود فایل PDF کاربرگ میوه ها برای پیش دبستانی، به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ نشانه آ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-آ.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-آ.webp", "desc": "کاربرگ نشانه آ پیش دبستان:  این کاربرگ جذاب و رنگارنگ، یک فعالیت آموزشی عالی برای کودکان پیش‌دبستانی است.  فعالیت اصلی این بخش شامل شناسایی و رنگ‌آمیزی"}, {"title": "کاربرگ نشانه ( ا ) غیر اول پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-13.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-15.webp", "desc": "کاربرگ نشانه ( ا ) غیر اول پیش دبستان: این کاربرگ با تمرین‌های جذاب مانند رنگ‌آمیزی شکل‌هایی که صدای آخر مشخصی دارند و نقاشی بر اساس تلفظ کلمات، به کودکان کمک"}, {"title": "کاربرگ نشانه ب پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش.webp", "desc": "کاربرگ نشانه ب پیش دبستان: این کاربرگ جذاب و رنگارنگ، مخصوص نوآموزان پیش‌دبستانی طراحی شده است تا با حروف الفبا به شیوه ای بازی گونه آشنا شوند. در بخش اول،"}, {"title": "کاربرگ نشانه ت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-1.webp", "desc": "کاربرگ نشانه ت پیش دبستان: این کاربرگ آموزشی جذاب با عنوان &quot;کاربرگ نشانه ت&quot; به منظور کمک به کودکان در یادگیری حرف &quot;ت&quot; در زبان فارسی طراحی شده است. در این"}, {"title": "کاربرگ نشانه ت  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ت.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ نشانه ج  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ج.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ج.webp", "desc": "کاربرگ نشانه ج  پیش دبستان:  این کاربرگ آموزشی با تمرکز بر حرف &quot;ج&quot; طراحی شده و راهنمایی بسیار خوبی برای نوآموزان است تا با شکل و صدای این حرف آشنا شوند. در"}, {"title": "کاربرگ نشانه خ  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-خ.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-خ.webp", "desc": "کاربرگ نشانه خ  پیش دبستان: این کاربرگ آموزشی طراحی شده است تا کودکان پیش‌دبستانی را با حرف &quot;خ&quot; آشنا کند. در بخش &quot;هم آغاز نشانه خ&quot;، کودک با کلماتی نظیر &quot;خرس&quot;،"}, {"title": "کاربرگ نشانه ذ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ذ-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ذ-1.webp", "desc": "کاربرگ نشانه ذ پیش دبستان: این کاربرگ آموزشی جذاب با هدف معرفی و تمرین حرف &quot;ذ&quot; در ابتدای کلمات برای کودکان پیش‌دبستانی طراحی شده است. در قسمت اول کاربرگ، سه"}, {"title": "کاربرگ نشانه ز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-ز.webp", "desc": "کاربرگ نشانه ز پیش دبستان: این کاربرگ آموزشی جذاب، با تمرکز بر آموزش حرف &quot;ز&quot; به کودکان پیش‌دبستانی طراحی شده است. در قسمت &quot;هم آغاز نشانه ز&quot;، کودکان با کلماتی"}, {"title": "کاربرگ  نشانه ف  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-ف.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-ف.webp", "desc": "کاربرگ نشانه ف پیش دبستان: این کاربرگ آموزشی جذاب، با هدف آموزش حرف &quot;ف&quot; به کودکان پیش‌دبستانی طراحی شده است. در مرکز صفحه، حرف &quot;ف&quot; به شکل بزرگ برای رنگ‌آمیزی"}, {"title": "کاربرگ نشانه م پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-5.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-7.webp", "desc": "کاربرگ نشانه م پیش دبستان: این کاربرگ جذاب، فرصتی عالی برای کودکان پیش‌دبستانی و سال اول است تا همزمان با سرگرم شدن، مهارت‌های خواندن، تشخیص حروف و رنگ‌آمیزی"}, {"title": "کاربرگ نشانه م  پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-م.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/نشانه-م.webp", "desc": "کاربرگ نشانه م  پیش دبستان: این کاربرگ آموزشی جذاب، با تمرکز بر حرف &quot;م&quot; برای کودکان پیش‌دبستانی طراحی شده است. در بخش &quot;هم آغاز نشانه م&quot;، کودکان با کلماتی"}, {"title": "کاربرگ آموزش نشانه پ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-11.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-13.webp", "desc": "آموزش نشانه پ پیش دبستان یکی از مهم‌ترین مراحل یادگیری زبان فارسی در نوآموزان است."}, {"title": "کاربرگ نشانه پ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-پ-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/نشانه-پ-1.webp", "desc": "کاربرگ نشانه پ پیش دبستان: این کاربرگ آموزشی جذاب، با هدف آموزش حرف &quot;پ&quot; به کودکان پیش‌دبستانی طراحی شده است. در مرکز صفحه، حرف &quot;پ&quot; به شکل بزرگ برای رنگ‌آمیزی"}, {"title": "کاربرگ نشانه چ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان.webp", "desc": "کاربرگ نشانه چ پیش دبستان: این کاربرگ آموزشی جذاب با عنوان &quot;کاربرگ نشانه چ&quot; برای کمک به کودکان در یادگیری حرف &quot;چ&quot; در زبان فارسی طراحی شده است. در این کاربرگ،"}, {"title": "کاربرگ نقاشی آب و هوا پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-نقاشی-آب-و-هوا-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-نقاشی-آب-و-هوا-پیش-دبستان.jpg", "desc": "این کاربرگ نقاشی آب و هوا پیش دبستان به کودکان شما کمک می‌کند تا با مفاهیم آب و هوای مختلف مانند آفتاب، ابر، باران و رنگین‌کمان آشنا شوند و مهارت‌های حرکتی"}, {"title": "کاربرگ نقاشی با نشانه های فارسی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نقاشی-با-نشانه-های-فارسی-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نقاشی-با-نشانه-های-فارسی-دبستان.webp", "desc": "با کاربرگ نقاشی با نشانه های فارسی دبستان، کودکان شما می‌توانند با نشانه‌های &quot;س&quot; و &quot;ت&quot; آشنا شوند، آن‌ها را رنگ‌آمیزی کنند و خط بکشند. این فعالیت جذاب، علاوه"}, {"title": "کاربرگ نقاشی عید غدیر خم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-نقاشی-عید-غدیر-خم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-نقاشی-عید-غدیر-خم.webp", "desc": "ما برای شما یک کاربرگ نقاشی عید غدیر خم بسیار زیبا از این روز مهم آماده کرده‌ایم. با نگاه کردن به این نقاشی می‌توانید داستان روز عید غدیر را مرور کنید:"}, {"title": "کاربرگ نقاشی مشاغل پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-25T215923.628.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-25T215857.820.webp", "desc": "در کاربرگ نقاشی مشاغل پیش دبستانی کنار رودخانه، کودکی نشسته و با چوب ماهیگیری در حال صبر کردن برای گرفتن ماهی است."}, {"title": "کاربرگ نقاشی موجودات دریایی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-29.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-32.webp", "desc": "کاربرگ نقاشی موجودات دریایی با موضوع جانوران دریایی طراحی شده و تصویری از دنیای زیر آب را به دانش‌آموزان معرفی می‌کند."}, {"title": "کاربرگ نقاشی نشانه ل کلاس اول دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-نقاشی-نشانه-ل-کلاس-اول-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-نقاشی-نشانه-ل-کلاس-اول-دبستان.webp", "desc": "این کاربرگ نقاشی نشانه ل کلاس اول دبستان، با هدف آشنایی عمیق‌تر دانش‌آموزان با شکل و صدای این نشانه طراحی شده است. در این کاربرگ، کودک با رنگ‌آمیزی و مشاهده‌ی"}, {"title": "کاربرگ نقاشی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-5.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/رنگ-آمیزی-4.webp", "desc": "کاربرگ نقاشی پیش دبستانی یک سرگرمی عالی برای تقویت مهارت‌های حرکتی ظریف، افزایش تمرکز و خلاقیت در کودکان است. خرس‌های بامزه و دوست‌داشتنی همیشه شخصیت‌های"}, {"title": "کاربرگ نقطه چین دست ورزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/555555.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ دست ورزی نقطه چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5444.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5445.jpg", "desc": "کاربرگ دست ورزی نقطه چین پیش دبستان با طراحی شاد و رنگارنگ، مهارت‌های ظریف حرکتی و هماهنگی چشم و دست را در نوآموزان تقویت می‌کند."}, {"title": "کاربرگ نقطه چین و دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-7.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-7.webp", "desc": "کاربرگ نقطه چین و دست ورزی پیش دبستان: این کاربرگ به عنوان یک ابزار آموزشی جذاب برای تقویت مهارتهای نوشتاری و هماهنگی حرکتی دانش آموزان طراحی شده است. تمرین"}, {"title": "کاربرگ نقطه چین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/دست-ورزی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/دست-ورزی-2.webp", "desc": "کاربرگ نقطه چین پیش دبستان: این کاربرگ به عنوان یک ابزار آموزشی جذاب برای تقویت مهارتهای نوشتاری و هماهنگی حرکتی دانش آموزان طراحی شده است. تمرین اصلی آن شامل"}, {"title": "کاربرگ نقطه چین پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-7.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-8.jpg", "desc": "کاربرگ نقطه چین پیش دبستانی با هدف تقویت مهارت‌های حرکتی ظریف و هماهنگی چشم و دست کودکان طراحی شده است. در این کاربرگ، پنج گل در بالای صفحه قرار دارند که هر"}, {"title": "کاربرگ رایگان لوحه نویسی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/لوحه-نویسی-2.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ نیروی دریایی برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نیروی-دریایی-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نیروی-دریایی-برای-پیش-دبستانی-557x800.webp", "desc": "۷ آذر در تقویم ایران به عنوان روز نیروی دریایی نام‌گذاری شده است؛ روزی برای قدردانی از دلیرمردانی که در سخت‌ترین شرایط از مرزهای آبی کشور محافظت می‌کنند. این"}, {"title": "کاربرگ نیروی دریایی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نیروی-دریایی-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-نیروی-دریایی.webp", "desc": "روز نیروی دریایی فرصتی است تا کودکان با یکی از مهم‌ترین نیروهای مدافع کشور آشنا شوند. نیروی دریایی، از مرزهای آبی ایران حفاظت می‌کند، مسیرهای تجاری دریایی را"}, {"title": "کاربرگ نیمه شعبان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-نیمه-شعبان-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-نیمه-شعبان-پیش-دبستان-2.webp", "desc": "نیمه شعبان، فرصتی شیرین برای آشنایی کودکان با یکی از زیباترین اعیاد مذهبی است. این کاربرگ نیمه شعبان پیش دبستان با طراحی ساده و کودک‌پسند، به نوآموزان کمک"}, {"title": "کاربرگ های آموزش ترکیب رنگ ها پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-آموزش-ترکیب-رنگ-ها-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-آموزش-ترکیب-رنگ-ها-پیش-دبستان.webp", "desc": "آیا آماده‌اید تا جادوی رنگ‌ها را کشف کنید؟ کاربرگ های آموزش ترکیب رنگ ها پیش دبستان ابزاری هیجان‌انگیز است که کودکان را به یک ماجراجویی هنری دعوت می‌کند. در"}, {"title": "کاربرگ های آموزش ترکیب رنگ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-آموزش-ترکیب-رنگ-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-آموزش-ترکیب-رنگ-پیش-دبستان.webp", "desc": "کاربرگ های آموزش ترکیب رنگ پیش دبستان یک ابزار آموزشی جذاب و کاربردی برای آشنایی کودکان با مفاهیم اولیه رنگ‌هاست. در این کاربرگ، کودک به‌صورت ساده و تصویری"}, {"title": "کاربرگ های آموزش رنگ های اصلی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-آموزش-رنگ-های-اصلی-پیش-دبستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ های آموزش نه گفتن کودکان به افراد ناشناس", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-های-آموزش-نه-گفتن-کودکان-به-افراد-ناشناس.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-های-آموزش-نه-گفتن-کودکان-به-افراد-ناشناس.webp", "desc": "امروز براتون، کاربرگ های آموزش نه گفتن کودکان به افراد ناشناس تهیه کردیم. آموزش مهارت «نه گفتن» فراتر از یک درس ساده، یک سپر دفاعی است. این مهارت به کودکان"}, {"title": "کاربرگ های آوا شناسی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-آوا-شناسی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-آوا-شناسی-پیش-دبستان.webp", "desc": "کاربرگ های آوا شناسی پیش دبستان مجموعه‌ای آموزشی و کاربردی برای تقویت مهارت‌های شنیداری و آوایی کودکان در سنین پیش‌دبستانی است. این کاربرگ‌ها با هدف کمک به"}, {"title": "کاربرگ های ارتباط یابی بین اشکال پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-ارتباط-یابی-بین-اشکال-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-ارتباط-یابی-بین-اشکال-پیش-دبستان.webp", "desc": "این کاربرگ های ارتباط یابی بین اشکال پیش دبستان، یکی از ابزارهای آموزشی جذاب و مؤثر برای کودکان محسوب می‌شوند. ، معمولاً اشکال هندسی ساده، حیوانات، میوه‌ها یا"}, {"title": "کاربرگ های تابستانه دست ورزی و رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-تابستانه-دست-ورزی-و-رنگ-آمیزی-پیش-دبستان.webp", "desc": "مجموعه کاربرگ های تابستانه دست ورزی و رنگ آمیزی پیش دبستان یک فایل آموزشی جذاب و کاربردی برای کودکان پیش‌دبستانی است که با هدف تقویت مهارت‌های حرکتی ظریف،"}, {"title": "کاربرگ های تقویت حافظه دیداری و هوش فضایی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-تقویت-حافظه-دیداری-و-هوش-فضایی-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگهای-تقویت-حافظه-دیداری-و-هوش-فضایی-پیش-دبستانی.webp", "desc": "این مجموعه کاربرگ های تقویت حافظه دیداری و هوش فضایی پیش دبستانی یک منبع آموزشی تخصصی برای کودکان پیش‌دبستانی است که با هدف تقویت حافظه دیداری و درک روابط"}, {"title": "کاربرگ های تکمیل اشکال ناقص پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-تکمیل-اشکال-ناقص-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-تکمیل-اشکال-ناقص-پیش-دبستان.webp", "desc": "این مجموعه کاربرگ های تکمیل اشکال ناقص پیش دبستان، ابزاری استاندارد و هدفمند برای تقویت مهارت‌های ادراکی و حرکتی کودکان در مقطع پیش‌دبستانی است. دستورالعمل"}, {"title": "کاربرگ های جذاب به مناسبت عید سعید قربان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-جذاب-به-مناسبت-عید-قربان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-جذاب-به-مناسبت-عید-قربان.webp", "desc": "با نزدیک شدن به عید سعید قربان، یکی از بهترین راه‌ها برای آشنایی کودکان با مفاهیم دینی و سنت‌های این عید بزرگ، استفاده از فعالیت‌های هنری و خلاقانه است. این"}, {"title": "کاربرگ های جذاب تاشو پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-جذاب-تاشو-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-جذاب-تاشو-پیش-دبستان.webp", "desc": "آموزش به کودکان از طریق بازی و فعالیت‌های عملی، ماندگارترین روش یادگیری است. کاربرگ های جذاب تاشو پیش دبستان، یک فعالیت تلفیقی است که مهارت‌های دست‌ورزی،"}, {"title": "کاربرگ های جذاب روز انار پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-انار-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-انار-پیش-دبستانی.webp", "desc": "کاربرگ های جذاب روز انار پیش دبستانی آماده شد! 🍁 انار، این یاقوت سرخ پاییز، نه تنها یک میوه‌ی خوشمزه است، بلکه در فرهنگ ما نماد برکت، شادمانی و فراوانی است."}, {"title": "کاربرگ های جذاب روز تربیت بدنی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-تربیت-بدنی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-تربیت-بدنی.webp", "desc": "مبارک باد ۲۶ مهر، کاربرگ های جذاب روز تربیت بدنی! فرصتی است تا اهمیت حیاتی فعالیت بدنی و تأثیر آن بر سلامت جسم و روانمان را دوباره به یاد آوریم. ورزش نه تنها"}, {"title": "کاربرگ های جذاب روز کتاب و کتاب خوانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-کتاب-و-کتاب-خوانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-جذاب-روز-کتاب-و-کتاب-خوانی.webp", "desc": "کاربرگ های جذاب روز کتاب و کتاب خوانی رو براتون آماده کردیم.۲۴ آبان ماه در تقویم رسمی ایران، روزی برای گرامیداشت یار مهربان، یعنی کتاب، و ترویج فرهنگ مقدس"}, {"title": "کاربرگ های جذاب ماتریس پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-جذاب-ماتریس-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-جذاب-ماتریس-پیش-دبستان.webp", "desc": "آموزش مفاهیم ریاضی و منطق به کودکان پیش از دبستان، اگر با بازی و سرگرمی همراه باشد، تأثیری ماندگار در ذهن آن‌ها خواهد داشت. کاربرگ های جذاب ماتریس پیش دبستان"}, {"title": "کاربرگ های خلاقیت و کاردستی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-خلاقیت-و-کاردستی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-خلاقیت-و-کاردستی.webp", "desc": "برای دانلود فایل pdf و رایگان کاربرگ های خلاقیت و کاردستی به انتهای همین صفحه مراجعه کنید."}, {"title": "کاربرگ های خلاق تابستانه دست ورزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-های-خلاق-تابستانه-دست-ورزی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/07/کاربرگ-های-خلاق-تابستانه-دست-ورزی-پیش-دبستان.webp", "desc": "دانلود کاربرگ های خلاق تابستانه دست ورزی پیش دبستان در سایت دکتر سمیه روحی امکان پذیر است. تمرینات “خط‌چین” یکی از بهترین روش‌ها برای آمادگی دست کودک جهت"}, {"title": "کاربرگ های خلاق تقویت دست ورزی پیش دبستان مرور تابستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-خلاق-تقویت-دست-ورزی-پیش-دبستان-مرور-تابستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-خلاق-تقویت-دست-ورزی-پیش-دبستان-مرور-تابستان.webp", "desc": "اگر به دنبال یک مجموعه‌ی کاربردی و جذاب برای تقویت دست‌ورزی کودکان پیش‌دبستانی هستید، کاربرگ های خلاق تقویت دست ورزی پیش دبستان مرور تابستان می‌تواند یک"}, {"title": "کاربرگ های رایگان روز جهانی پست", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-رایگان-روز-جهانی-پست-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-رایگان-روز-جهانی-پست.webp", "desc": "این کاربرگ های رایگان روز جهانی پست را برای شما بچه های باهوش آماده کردیم. هدف اصلی از ارائه این طرح، آموزش و سرگرمی برای کودکان است. رنگ‌آمیزی این تصویر به"}, {"title": "کاربرگ های رایگان روز پدر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/روز-پدر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/روز-پدر.jpeg", "desc": "این مجموعه کاربرگ های رایگان روز پدر، فرصتی ارزشمند برای کودکان فراهم می‌کند تا با استفاده از هنر و کلام، عشق و قدردانی خود را به پدرانشان ابراز کنند."}, {"title": "کاربرگ های رنگ‌آمیزی روز جهانی دختر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-های-رنگ‌آمیزی-روز-جهانی-دختر-1-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/روزجهانی-دختر-1.webp", "desc": "به مناسبت فرا رسیدن روز جهانی دختر، یکی از زیباترین هدایایی که می‌توانیم به کودکان و دانش‌آموزان بدهیم، ایجاد فضایی برای خلاقیت و شادی آن‌هاست. به همین منظور،"}, {"title": "کاربرگ های رنگ آمیزی به مناسبت عید غدیر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-رنگ-آمیزی-به-مناسبت-عید-غدیر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-رنگ-آمیزی-به-مناسبت-عید-غدیر.webp", "desc": "کاربرگ های رنگ آمیزی به مناسبت عید غدیر یکی از بهترین ابزارهای آموزشی برای آشنا کردن کودکان با این عید بزرگ و ارزشمند اسلامی هستند. در این مجموعه، تصاویر"}, {"title": "کاربرگ های رنگ آمیزی روز جهانی سالمندان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-های-رنگ-آمیزی-روز-جهانی-سالمندان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-های-رنگ-آمیزی-روز-جهانی-سالمندان-583x800.webp", "desc": "کاربرگ های رنگ آمیزی روز جهانی سالمندان، که هرساله در  ۹ مهر گرامی داشته می‌شود، صرفاً یک مناسبت تقویمی نیست؛ بلکه فرصتی مغتنم برای ارج نهادن به بزرگترین"}, {"title": "کاربرگ های روز جهانی دامپزشک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-روز-جهانی-دامپزشک-.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ های روز روستا و عشایر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-روز-روستا-و-عشایر-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-روز-روستا-و-عشایر.webp", "desc": "کاربرگ های روز روستا و عشایر فرصتی مغتنم برای ارج نهادن به ریشه‌ها و اصالت‌های فرهنگی، اقتصادی و اجتماعی کشورمان است. این روز نه تنها بزرگداشت سخت‌کوشی و تلاش"}, {"title": "کاربرگ های روز مادر ۲۴ آذر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-روز-مادر-۲۴-آذر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-روز-مادر-۲۴-آذر.webp", "desc": "اهداف طراحی این کاربرگ‌ها فراتر از سرگرمی صرف است و ابعاد تربیتی مهمی را دربرمی‌گیرد:"}, {"title": "کاربرگ های روز کریسمس پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-روز-کریسمس-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-روز-کریسمس-پیش-دبستان.webp", "desc": "این کاربرگ های روز کریسمس پیش دبستان، تجربه‌ای شاد و آموزنده را برای کودکان فراهم می‌کند. این فایل شامل تصاویر متنوعی از نمادهای کریسمس مانند بابانوئل، درخت"}, {"title": "کاربرگ های زیبا شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-زیبا-شب-یلدا-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-زیبا-شب-یلدا.webp", "desc": "کاربرگ‌های رنگ‌آمیزی و نقاشی شب یلدا، ابزاری جذاب برای آشنایی دانش‌آموزان دبستان با یکی از کهن‌ترین جشن‌های ایرانی و بلندترین شب سال، یعنی شب چله، هستند. این"}, {"title": "کاربرگ های سالروز شهادت حضرت فاطمه سلام الله علیها", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-سالروز-شهادت-حضرت-فاطمه-سلام-الله-علیها.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-سالروز-شهادت-حضرت-فاطمه-سلام-الله-علیها.webp", "desc": "این کاربرگ های سالروز شهادت حضرت فاطمه سلام الله علیها با هدف آشنایی کودکان و نوجوانان با شخصیت والای حضرت فاطمه زهرا (س) و مقام ایشان در اسلام طراحی شده است."}, {"title": "کاربرگ های فصل پاییز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-فصل-پاییز-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-فصل-پاییز-پیش-دبستان.webp", "desc": "کاربرگ های فصل پاییز پیش دبستان مجموعه‌ای آموزشی و سرگرم‌کننده هستند که برای نوآموزان دوره پیش‌دبستانی طراحی شده‌اند. هدف این کاربرگ‌ها، آشنایی کودکان با"}, {"title": "کاربرگ های ماز و مسابقه ای پیش دبستان ویژه محرم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-ماز-و-مسابقه-ای-پیش-دبستان-ویژه-محرم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-های-ماز-و-مسابقه-ای-پیش-دبستان-ویژه-محرم.webp", "desc": "این کاربرگ زیبا با موضوع شور و شوق حسینی، یکی از کاربرگ‌های آموزشی و سرگرم‌کننده ویژه کودکان پیش‌دبستانی است که با هدف آشنایی بچه‌ها با فضای معنوی محرم و روضه"}, {"title": "کاربرگ های مرور الگویابی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-مرور-الگویابی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-های-مرور-الگویابی-پیش-دبستان.webp", "desc": "الگویابی یکی از مهم‌ترین مهارت‌های پایه در یادگیری ریاضی برای کودکان پیش‌دبستانی است. در این کاربرگ های مرور الگویابی پیش دبستان، کودک با مشاهده الگوی رنگی"}, {"title": "کاربرگ های مناسبتی شب یلدا", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-مناسبتی-شب-یلدا-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-های-مناسبتی-شب-یلدا.webp", "desc": "کاربرگ های مناسبتی شب یلدا! با رنگ‌آمیزی، برش، تا کردن و چسباندن، یک کاردستی یلدایی بسازید و سفره‌تان را زیباتر کنید."}, {"title": "کاربرگ های نقاشی موزائیکی دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-های-نقاشی-موزائیکی-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-های-نقاشی-موزائیکی-دبستان.webp", "desc": "این کاربرگ های نقاشی موزائیکی دبستان ابزاری جذاب و آموزشی برای تقویت دقت، تمرکز و خلاقیت دانش‌آموزان دوره ابتدایی هستند. در این کاربرگ‌ها، دانش‌آموز با"}, {"title": "کاربرگ های هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-های-هوش-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-های-هوش-پیش-دبستان.webp", "desc": "این کاربرگ های هوش پیش دبستان چیزی فراتر از یک نقاشی ساده است؛ این یک تمرین عالی برای تقویت هوش دیداری و افزایش دقت و تمرکز در کودکان پیش‌دبستانی است. کودک با"}, {"title": "کاربرگ های ولادت امام رضا علیه الاسلام", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-های-ولادت-امام-رضا-علیه-الاسلام.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-های-ولادت-امام-رضا-علیه-الاسلام.webp", "desc": "کاربرگ های ولادت امام رضا علیه الاسلام مجموعه‌ای آموزشی و کاربردی برای آشنایی دانش‌آموزان با شخصیت نورانی امام هشتم شیعیان، حضرت علی بن موسی‌الرضا علیه‌السلام"}, {"title": "کاربرگ های ویژه ماه مبارک رمضان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-های-ویژه-ماه-مبارک-رمضان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-های-ویژه-ماه-مبارک-رمضان.webp", "desc": "این کاربرگ های ویژه ماه مبارک رمضان، ماه مهمانی خدا، فرصتی بی‌نظیر برای آشنایی کودکان با زیبایی‌های دین و معنویت است. در این روزهای پربرکت، استفاده از"}, {"title": "کاربرگ های ۱۳ آبان روز دانش آموز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-۱۳-آبان-روز-دانش-آموز-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-های-۱۳-آبان-روز-دانش-آموز.webp", "desc": "کاربرگ های ۱۳ آبان روز دانش آموز را برای ستون های استوار ایران آماده کردیم. روز دانش‌آموز، روز گرامیداشت قشر پُرشور و پُرامید جامعه، یعنی شما عزیزان"}, {"title": "کاربرگ ها به مناسبت اربعین و شهادت امام حسین علیه الاسلام", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ها-به-مناسبت-اربعین-و-شهادت-امام-حسین-علیه-الاسلام.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-ها-به-مناسبت-اربعین-و-شهادت-امام-حسین-علیه-الاسلام.webp", "desc": "آموزش مفاهیم دینی و ارزشی به کودکان، زمانی بیشترین تاثیر را دارد که با هنر و سرگرمی همراه شود. واقعه عاشورا و پیاده‌روی عظیم اربعین، بستری غنی از آموزه‌های"}, {"title": "کاربرگ هوای پاک پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوای-پاک-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوای-پاک-پیش-دبستان.webp", "desc": "کاربرگ هوای پاک پیش دبستان: این کاربرگ آموزشی با عنوان &quot;کاربرگ هوای پاک&quot; به شیوه‌ای مؤثر و بصری، اهمیت حفظ محیط زیست و مقابله با آلودگی هوا را به کودکان آموزش"}, {"title": "کاربرگ هوش، دقت و ماز مسیریابی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/۲.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sa9892py.webp", "desc": "این کاربرگ یک تمرین مهارتی جذاب برای تقویت هوش، دقت و توانایی مسیریابی در کودکان طراحی شده است."}, {"title": "کاربرگ‌ هوش خلاقیت پیش دبستانی (رایگان/pdf)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ‌-هوش-خلاقیت-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ‌-هوش-خلاقیت-پیش-دبستانی.webp", "desc": "کاربرگ‌ هوش خلاقیت پیش دبستانی مجموعه‌ای جذاب از تمرین‌های تصویری و فکری است که با هدف تقویت تمرکز، دقت، حافظه دیداری و تفکر منطقی کودکان طراحی شده است."}, {"title": "کاربرگ هوش ریاضی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-هوش-ریاضی-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-هوش-ریاضی-پیش-دبستان.webp", "desc": "این کاربرگ هوش ریاضی پیش دبستان با هدف تقویت هوش ریاضی و درک بهتر مفهوم عدد در کودکان طراحی شده است. در این فعالیت، کودک باید با توجه به عددِ نوشته‌شده روی"}, {"title": "کاربرگ هوش و استعداد پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش-و-استعداد.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش-و-استعداد.webp", "desc": "کاربرگ هوش و استعداد پیش دبستان: این کاربرگ به منظور تقویت مهارتهای شناختی و تحلیلی دانش آموزان طراحی شده است. تمرین اصلی آن شامل وصل کردن اجزای مرتبط به هم"}, {"title": "کاربرگ هوش و استعداد یابی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/هوش-1.webp", "desc": "کاربرگ هوش و استعداد یابی پیش دبستان:  این کاربرگ جذاب برای تقویت مهارت‌های دیداری و شناختی در کودکان پیش‌دبستانی و ابتدایی طراحی شده است. در بخش اول، با"}, {"title": "کاربرگ هوش و تشخیص سایه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/1-15.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/2-3.webp", "desc": "کاربرگ هوش و تشخیص سایه پیش دبستان: این کاربرگ زیبا با هدف تقویت مهارت‌های حرکتی ظریف کودکان طراحی شده است. کودکان با دنبال کردن خطوط نقطه‌چین، شکل‌های ساده"}, {"title": "کاربرگ هوش و دقت پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-هوش-و-دقت-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-هوش-و-دقت-پیش-دبستان.webp", "desc": "کاربرگ هوش و دقت پیش دبستان، با استفاده از تصاویر بامزه جوجه و تخم‌مرغ شکسته، یک فعالیت چالش‌برانگیز و سرگرم‌کننده برای کودکان ۳ تا ۷ سال است. این تمرین نه"}, {"title": "کاربرگ هوش و دقت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-هوش-و-دقت-پیش-دبستانی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-هوش-و-دقت-پیش-دبستانی.webp", "desc": "این کاربرگ هوش و دقت پیش دبستانی که با تصاویر شاد و مرتبط با محیط مدرسه طراحی شده، ابزاری عالی برای این منظور است! هدف اصلی این فعالیت، بهبود مهارت‌های"}, {"title": "کاربرگ هوش و رنگ آمیزی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاربرگ-هوش-و-رنگ-آمیزی-پیش-دبستان-مرور-تابستان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ هوش و رنگ آمیزی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-2.jpg", "desc": "کاربرگ هوش و رنگ آمیزی پیش دبستانی، یکی از ابزارهای مؤثر در آموزش مفاهیم پایه‌ای هندسه و تقویت مهارت‌های شناختی در دوره پیش‌دبستانی است."}, {"title": "کاربرگ هوش پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/هوش.webp", "desc": "کاربرگ هوش پیش دبستان: این کاربرگ آموزشی به منظور تقویت مهارتهای ارتباطی و شناختی دانش آموزان طراحی شده است. تمرین اصلی آن شامل وصل کردن اجزای مرتبط به هم است"}, {"title": "کاربرگ هوش پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/هوش.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/هوش1.jpg", "desc": "کاربرگ هوش پیش دبستانی با هدف پرورش دقت دیداری، مهارت تطبیق و تقویت حافظه‌ی تصویری طراحی شده است."}, {"title": "دانلود کاربرگ واحدکار آبزیان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T200011.639.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ واحدکار آشپز برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T013530.907.pdf", "source": "سمیه روحی"}, {"title": "نمونه کاربرگ واحدکار اجزای گیاهان برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T142924.022.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T142821.780.webp", "desc": "کاربرگ واحدکار اجزای گیاهان شامل تصویری از گل آفتابگردان است که دانش‌آموز باید اجزای مختلف آن را شناسایی کند."}, {"title": "کاربرگ واحدکار بهداشت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T211216.633.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T211156.974.webp", "desc": "در کاربرگ واحدکار بهداشت پیش دبستانی، قهرمان کوچک ما در حال انجام کار مهمی مانند شستن دست‌ها است. این فعالیت فرصتی عالی است تا کودک شما ضمن لذت بردن از"}, {"title": "نمونه کاربرگ واحدکار بهداشت علوم پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T195103.032.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-96.webp", "desc": "کاربرگ واحدکار بهداشت علوم پیش دبستانی با تمرکز بر بهداشت شخصی طراحی شده است تا کودکان با وسایل بهداشتی و کاربرد هر یک آشنا شوند."}, {"title": "کاربرگ واحدکار بهداشت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T213043.127.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T213015.860.webp", "desc": "در کاربرگ واحدکار بهداشت پیش دبستانی، تصویری از کودکی که در حال حمام است همراه با وسایل مختلف در اختیار دانش‌آموز قرار می‌گیرد. وسایل شامل پودر بچه، حوله،"}, {"title": "دانلود نمونه کاربرگ واحدکار بهداشت پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-37.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-8.webp", "desc": "در کاربرگ واحدکار بهداشت پیش دبستانی، تصویری از کودکی که در حال حمام است همراه با وسایل مختلف در اختیار دانش‌آموز قرار می‌گیرد. وسایل شامل  حوله، شامپو، نرم"}, {"title": "کاربرگ واحدکار تشخیص بویایی پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-8.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-10.webp", "desc": "کاربرگ واحدکار تشخیص بویایی درباره‌ی آموزش حس بویایی و تشخیص بوهای خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "دانلود کاربرگ واحدکار تشخیص شنوایی پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-9.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-11.webp", "desc": "این کاربرگ واحدکار تشخیص شنوایی و تشخیص صداهای خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ واحدکار تشخیص چشایی پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-16.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-19.webp", "desc": "کاربرگ واحدکار تشخیص چشایی درباره‌ی آموزش حس چشایی و تشخیص طعم های خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "دانلود رایگان کاربرگ واحدکار حس بینایی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-18.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-21.webp", "desc": "کاربرگ واحدکار حس بینایی درباره‌ی آموزش حس بینایی و تشخیص تصاویر خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ واحدکار حس لامسه پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-20.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-23.webp", "desc": "کاربرگ واحدکار حس لامسه پیش‌دبستان درباره‌ی آموزش حس لامسه و تشخیص حس های خوشایند و ناخوشایند به کودکان پیش‌دبستانی است."}, {"title": "کاربرگ واحدکار حیوانات اهلی و وحشی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-واحدکار-حیوانات-اهلی-و-وحشی-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-واحدکار-حیوانات-اهلی-و-وحشی.jpg", "desc": "این کاربرگ واحدکار حیوانات اهلی و وحشی برای کودکان باهوش شما طراحی شده است. هدف از این فعالیت، تقویت مهارت‌های بینایی، دست و چشم و همچنین افزایش دانش عمومی"}, {"title": "کاربرگ واحدکار حیوانات اهلی و وحشی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-واحدکار-حیوانات-اهلی-و-وحشی-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/کاربرگ-واحدکار-حیوانات-اهلی-و-وحشی-پیش-دبستان.jpg", "desc": "این کاربرگ واحدکار حیوانات اهلی و وحشی پیش دبستان یک ابزار آموزشی جذاب و دیداری برای کودکان است که به شکل یک پازل چهار قسمتی طراحی شده و تصویر یک تمساح سبز و"}, {"title": "کاربرگ واحدکار خزندگان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T183153.106.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ واحدکار خوراکی های مفید و مضر پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-21T121510.388.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-21T121452.133.webp", "desc": "کاربرگ واحدکار خوراکی های مفید و مضر به صورت تصویری و با استفاده از فعالیت‌های جذاب، به کودک کمک می‌کند تا تفاوت بین غذاهای مفید و غیرمفید را درک کند و این"}, {"title": "دانلود کاربرگ واحدکار دامپزشکی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T205548.616.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T205522.047.webp", "desc": "کاربرگ واحدکار دامپزشکی یک فعالیت جذاب و آموزشی برای کودکان پیش‌دبستانی است که با موضوع دامپزشکی طراحی شده است."}, {"title": "کاربرگ واحدکار دندان پزشک برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T210251.606.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T210201.155.webp", "desc": "در کاربرگ واحدکار دندان پزشک از دانش‌آموز خواسته می‌شود که تصویر مربوط به شغل دندانپزشک را با دقت مشاهده کرده و تمامی بخش‌های آن را رنگ‌آمیزی کند."}, {"title": "کاربرگ واحدکار سایه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T202419.056.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T202405.959.webp", "desc": "کاربرگ واحدکار سایه پیش دبستان، ابزاری آموزشی و فکری بسیار مؤثر برای کودکان پیش‌دبستانی و مهدکودک است. هدف اصلی این کاربرگ مفهوم سایه پیش دبستان تقویت تمایز"}, {"title": "کاربرگ واحدکار شب و روز پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-27T193357.341.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-27T193340.523.webp", "desc": "کاربرگ واحدکار شب و روز پیش دبستان درباره‌ی تفاوت شب و روز و فعالیت‌های مربوط به هرکدام طراحی شده و به دانش‌آموز کمک می‌کند نشانه‌های شب و روز را از طریق"}, {"title": "کاربرگ واحدکار فصل زمستان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T194856.115.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-18T194841.680.webp", "desc": "کاربرگ واحدکار فصل زمستان به دانش‌آموزان فرصتی می‌دهد تا با موضوع زمستان و عناصر مرتبط با آن آشنا شوند و خلاقیت خود را در رنگ‌آمیزی به کار بگیرند."}, {"title": "کاربرگ واحدکار مراحل رشد قورباغه پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T175853.242.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ واحدکار مشاغل پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-واحدکار-مشاغل-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-واحدکار-مشاغل-پیش-دبستانی.webp", "desc": "در کاربرگ واحدکار مشاغل پیش دبستانی، تعدادی شغل مختلف در یک سمت و مجموعه‌ای از وسایل نقلیه در سمت دیگر قرار گرفته‌اند. هر تصویر شغلی با لباس و نشانه‌های مخصوص"}, {"title": "کاربرگ واحدکار موجودات زنده و غیر زنده برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-18T194037.332.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-18T194019.020.webp", "desc": "کاربرگ واحدکار موجودات زنده و غیر زنده به دانش‌آموزان کمک می‌کند تا تفاوت بین موجودات زنده و غیرزنده را به‌طور عملی یاد بگیرند و ویژگی‌های اصلی موجودات زنده"}, {"title": "نمونه کاربرگ واحدکار وسایل نقلیه پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T192005.435.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-19T191947.473.webp", "desc": "کاربرگ واحدکار وسایل نقلیه جرثقیل یکی از کاربرگ‌های آموزشی جذاب برای آشنایی کودکان با مشاغل و ابزارهای کاربردی است."}, {"title": "کاربرگ واحدکار وسایل نقلیه اتوبوس برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-31.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-2-1.webp", "desc": "کاربرگ واحدکار وسایل نقلیه اتوبوس فرصتی عالی برای آشنایی کودکان با یکی از مهم‌ترین وسایل نقلیه عمومی است."}, {"title": "کاربرگ واحدکار وسایل نقلیه (تاکسی) برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T185419.902.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-19T185400.582.webp", "desc": "کاربرگ واحدکار وسایل نقلیه (تاکسی) فرصتی عالی برای آشنایی کودکان با یکی از مهم‌ترین وسایل نقلیه عمومی است."}, {"title": "کاربرگ واحدکار وسیله نقلیه (هلیکوپتر) پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T210804.781.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T210749.402.webp", "desc": "در کاربرگ واحدکار وسیله نقلیه تصویر یک هلیکوپتر طراحی شده تا کودک علاوه بر رنگ‌آمیزی، با شکل و کاربرد این وسیله نقلیه آشنا شود. هلیکوپتر وسیله‌ای ایده ال است"}, {"title": "کاربرگ واحدکار پرستار پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-22T224351.638.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-22T224151.685.webp", "desc": "کاربرگ واحدکار پرستار با تصویر واضح و خطی یک پرستار طراحی شده است و تمرکز آن بر آشنایی دانش‌آموز با شغل پرستاری از طریق مشاهده و فعالیت رنگ‌آمیزی است."}, {"title": "کاربرگ واحدکار پرندگان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-واحدکار-پرندگان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-واحدکار-پرندگان-566x800.webp", "desc": "کاربرگ واحدکار پرندگان با فرمت PDF و کیفیت بالا قابل دانلود است و یک منبع ارزشمند برای آموزش عملی واحد کار پرندگان در کلاس یا منزل می‌باشد."}, {"title": "کاربرگ واحدکار پرندگان پیش دبستان pdf", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-واحدکار-پرندگان-پیش-دبستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-واحدکار-پرندگان-پیش-دبستان-566x800.webp", "desc": "این فایل، یک کاربرگ رنگ آمیزی و تخصصی از سری واحد کار پرندگان است که برای تقویت مهارت‌های دیداری و حرکتی ظریف کودکان پیش دبستانی تهیه شده است."}, {"title": "کاربرگ واحدکار پیش دبستانی &#8211; آموزشگاه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحدکار-آموزشگاه-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحدکار-آموزشگاه-پیش-دبستانی.webp", "desc": "آماده شو برای یک روز شاد و پرماجرا در کاربرگ واحدکار پیش دبستانی - آموزشگاه! تصویر پایین، کودکی خوشحال را نشان می‌دهد که با کیف مدرسه‌اش در راه ساختمان زیبای"}, {"title": "کاربرگ واحدکار کره زمین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T183751.355.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T183706.527.webp", "desc": "سفر رنگین به سیاره سبز! این کاربرگ شناخت زمین پیش دبستان ، دروازه‌ای است به دنیای شگفت‌انگیز کره زمین. از خورشید گرمابخش در آسمان تا درختان سرسبز، کوه‌ها و"}, {"title": "کاربرگ واحد کار خزندگان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-واحد-کار-خزندگان.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ واحد کار خیابان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T204621.791.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-31T204526.985.webp", "desc": "کاربرگ واحد کار خیابان با ویژگی‌های خاصی طراحی شده تا حداکثر کارایی آموزشی را داشته باشد. محتوای آن کاملاً جامع، جذاب و منطبق با نیازها و توانمندی‌های کودکان"}, {"title": "12 کاربرگ واحد کار راهنمایی و رانندگی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-راهنمایی-و-رانندگی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-راهنمایی-و-رانندگی.webp", "desc": "با رنگ‌آمیزی و بحث در مورد کاربرگ واحد کار راهنمایی و رانندگی، دانش‌آموزان یاد می‌گیرند که چگونه به‌عنوان عابران پیاده مسئول و ایمن در جامعه خود رفتار کنند."}, {"title": "کاربرگ واحد کار روز دامپزشک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-روز-دامپزشک-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-روز-دامپزشک.webp", "desc": "برای دانلود فایل PDF کاربرگ واحد کار روز دامپزشک، کاربران می‌توانند به انتهای صفحه مراجعه کنند."}, {"title": "کاربرگ واحد کار شناخت وسایل حمل و نقل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T191855.996.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-93.webp", "desc": "کاربرگ واحد کار شناخت وسایل حمل و نقل پیش دبستانی سرگرم‌کننده و آموزشی، با تمرکز بر وسایل نقلیه طراحی شده است تا کودکان با انواع روش‌های حمل و نقل آشنا شوند."}, {"title": "کاربرگ واحد کار فصل زمستان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-فصل-زمستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-فصل-زمستان.webp", "desc": "کاربرگ واحد کار فصل زمستان، علاوه بر تقویت مهارت‌های حرکتی ظریف (Fine Motor Skills) از طریق رنگ‌آمیزی، به تثبیت مفاهیم زیر کمک می‌کنند. دانلود رایگان فایل pdf"}, {"title": "کاربرگ واحد کار میوه های پاییزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/واحد-کار-میوه-های-پاییزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/واحد-کار-میوه-های-پاییزی-600x800.webp", "desc": "این فایل کاربرگ واحد کار میوه های پاییزی برای کودکان با موضوع میوه‌های پاییزی است. در این صفحه، نام و تصویر چند میوه‌ی پاییزی به زبان فارسی دیده می‌شود و از"}, {"title": "کاربرگ واحد کار ورزش پیش‌دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-31T212245.988.pdf", "source": "سمیه روحی"}, {"title": "دانلود کاربرگ واحد کار پرندگان پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-17T193728.174.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-95.webp", "desc": "کاربرگ واحد کار پرندگان پیش دبستان با تمرکز بر پرندگان طراحی شده است تا کودکان با انواع پرندگان و ویژگی‌های آن‌ها آشنا شوند."}, {"title": "کاربرگ آشنایی با بازیافت کردن زباله", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-بازیافت.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-بازیافت.webp", "desc": "جهان ما، خانه‌ی ماست! کاربرگ آشنایی با بازیافت کردن زباله، امروز فرصتی را مهیا کرده تا با فرزندان دلبندمان درباره‌ی اهمیت بازیافت و حفظ محیط زیست صحبت کنیم."}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; حالات چهره با لابوبو", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-حالات-چهره-با-لابوبو.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ شناخت وسایل حمل و نقل پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-حمل-و-نقل.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-حمل-و-نقل.webp", "desc": "تصویری برای ماجراجویی و یادگیری! این کاربرگ شناخت وسایل حمل و نقل پیش دبستان، کودکان را با دنیای هیجان‌انگیز حمل و نقل آشنا می‌کند. از یک موتورسیکلت سریع"}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; خط خمیده", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-خط-خمیده.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-خط-خمیده.webp", "desc": "آموزش مهارت‌های پیش‌نیاز نوشتن، یکی از مهم‌ترین گام‌ها در مسیر آماده‌سازی کودکان برای ورود به مدرسه است. کاربرگ واحد کار پیش دبستان - خط خمیده، ابزاری عالی"}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; رفتار های درست و غلط", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-رفتار-های-درست-و-غلط.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-رفتار-های-درست-و-غلط.webp", "desc": "کاربرگ واحد کار پیش دبستان - رفتار های درست و غلط، یک ابزار آموزشی تعاملی و جذاب برای کودکان پیش‌دبستانی است تا با مفاهیم اولیه اخلاقی و اجتماعی آشنا شوند. در"}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; رنگین کمان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-رنگین-کمان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-رنگین-کمان.webp", "desc": "کاربرگ واحد کار پیش دبستان - رنگین کمان را برای شما بچه ای دوستداشتنی آماده کردیم. آیا تا به حال پس از یک باران قشنگ، خورشید را دیده‌اید که دوباره می‌تابد؟ در"}, {"title": "کاربرگ شناخت زمین پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-زمین.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-زمین.webp", "desc": "سفر رنگین به سیاره سبز! این کاربرگ شناخت زمین پیش دبستان ، دروازه‌ای است به دنیای شگفت‌انگیز کره زمین. از خورشید گرمابخش در آسمان تا درختان سرسبز، کوه‌ها و"}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; صرفه جویی آب", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-صرفه-جویی-آب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-صرفه-جویی-آب.webp", "desc": "کاربرگ واحد کار پیش دبستان - صرفه جویی آب تصویر نگران‌کننده کره زمین به شکل یک شیر آب چکان، یادآور این حقیقت مهم است که منابع آب شیرین ما محدود هستند. دو"}, {"title": "کاربرگ آموزش صرفه جویی کردن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-صرفه-جویی-کردن.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ واحد کار پیش دبستان &#8211; فصل پاییز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-فصل-پاییز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-پیش-دبستان-فصل-پاییز.webp", "desc": "کاربرگ واحد کار پیش دبستان - فصل پاییز رو براتون تهیه کردیم، فصل هزار رنگ و شگفتی! در این تصویر زیبا، کودکان با شادی در میان برگ‌های رنگارنگ افتاده بازی"}, {"title": "دانلود کاربرگ واحد کار گیاهان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-29T213454.581.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-29T213406.584.webp", "desc": "همراهان عزیز، امروز وارد دنیای شگفت‌انگیز گیاهان می‌شویم! کاربرگ واحد کار گیاهان پیش‌دبستانی، فرصتی است تا نوگلان شما از نزدیک با رازهای رشد، تغذیه و اهمیت"}, {"title": "کاربرگ واحد کار گیاهان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-2-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-23-1.webp", "desc": "همراهان عزیز، امروز وارد دنیای شگفت‌انگیز گیاهان می‌شویم! کاربرگ واحد کار گیاهان پیش‌دبستانی، فرصتی است تا نوگلان شما از نزدیک با رازهای رشد، تغذیه و اهمیت"}, {"title": "کاربرگ وسایل ارتباطی جمعی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-81.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-36.webp", "desc": "در کاربرگ وسایل ارتباطی جمعی، دانش‌آموز باید با تمرکز کامل به مجموعه‌ای از تصاویر مشخص نگاه کند و از میان آن‌ها فقط وسایلی را شناسایی کند که برای «ارتباط"}, {"title": "کاربرگ وسایل نقلیه (قطار) برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-49.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-19-1.webp", "desc": "کاربرگ وسایل نقلیه (قطار) فرصتی عالی برای آشنایی کودکان با یکی از مهم‌ترین وسایل نقلیه عمومی است."}, {"title": "دانلود نمونه کاربرگ وسایل نقلیه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-24T213847.284.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-24T213829.382.webp", "desc": "کاربرگ وسایل نقلیه پیش دبستان، تصاویر وسایل نقلیه شامل ماشین، هواپیما، قایق و قطار در یک سمت و مسیرهای مرتبط شامل هوایی، دریایی و زمینی در سمت دیگر قرار دارند."}, {"title": "کاربرگ ولادت حضرت زینب و روز پرستار", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-ولادت-حضرت-زینب.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-ولادت-حضرت-زینب.webp", "desc": "🎨 کاربرگ ولادت حضرت زینب:در این کاربرگ، می‌توانید با رنگ‌های زیبا و شاد، مهربانی و آرامش را نشان دهید."}, {"title": "کاربرگ ولادت حضرت زینب پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-ولادت-حضرت-زینب-پیش-دبستانی.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پر و خالی پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/07/پیش-دبستان-5.webp", "desc": "کاربرگ پر و خالی پیش دبستان: در این کاربرگ، دو گلدان به تصویر کشیده شده است: یکی پر از گل‌های زیبا و دیگری کاملاً خالی. پرسش اصلی کاربرگ &quot;پر- خالی (کدام گلدان"}, {"title": "کاربرگ پوشاک در انواع آب و هوا پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-3.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-4.webp", "desc": "در کاربرگ پوشاک در انواع آب و هوا، چهار تصویر کلاه، چتر،کاپشن، عینک در یک سمت و تصاویر آب و هوای هر فصل در سمت دیگر قرار دارند."}, {"title": "کاربرگ پوشش مناسب برای بخش‌های مختلف بدن پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-41.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-12-1.webp", "desc": "کاربرگ پوشش مناسب برای بخش‌های مختلف بدن با هدف آشنایی دانش‌آموزان با پوشش مناسب هر بخش از بدن طراحی شده است."}, {"title": "کاربرگ پیداکردن تفاوت اشکال پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دیستان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دیستان.webp", "desc": "نگاهی نو به تفاوت‌ها"}, {"title": "کاربرگ پیش‌دبستانی فسیل و موجودات گذشته", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-30T211313.071.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-30T211253.252.webp", "desc": "کاربرگ پیش‌دبستانی فسیل درباره‌ی کاوش و کشف آثار باقی‌مانده از موجودات زنده‌ی گذشته در طبیعت است. تصویر نشان‌دهنده‌ی فعالیتی علمی و اکتشافی است که به بررسی"}, {"title": "کاربرگ پیش‌دبستانی واحدکار آشنایی با مشاغل (پست چی)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/واحدکار-آشنایی-با-مشاغل-پست-چی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/واحدکار-آشنایی-با-مشاغل-پست-چی.webp", "desc": "واحدکار آشنایی با مشاغل (پست چی) درباره‌ی آشنایی با شغل پست چی است. تصویر، یک پست چی را در محیط  نشان می‌دهد که در حال گذاشتن نامه ها در صندق است."}, {"title": "کاربرگ پیش دبستانی آموزش عدد ۶", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1863.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/rouhi1-copy-2.webp", "desc": "کاربرگ پیش دبستانی آموزش عدد ۶ یک راهکار خلاقانه و بازی‌محور برای آشنایی با اعداد، به خصوص عدد ۶، ارائه می‌دهد."}, {"title": "کاربرگ پیش دبستانی تفاوت ها", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1799-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sam22py.webp", "desc": "کاربرگ پیش دبستانی تفاوت ها رنگارنگ و جذاب، دنیایی از صداها و تصاویر را به کودکان پیش‌دبستانی معرفی می‌کند."}, {"title": "کاربرگ پیش دبستانی حیوانات اهلی و وحشی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-34.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-5-1.webp", "desc": "کاربرگ پیش دبستانی حیوانات اهلی و وحشی یک ابزار آموزشی و سرگرم‌کننده ایده‌آل برای کودکان در رده سنی پیش دبستانی است. این کاربرگ که به صورت سیاه و سفید طراحی"}, {"title": "کاربرگ پیش دبستانی دست ورزی کار با قیچی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/000ted.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/converted-1-2.webp", "desc": "کاربرگ پیش دبستانی دست ورزی، ابزاری عالی برای تقویت مهارت‌های دست‌ورزی و هماهنگی چشم و دست کودکان است."}, {"title": "کاربرگ پیش دبستانی زبان آموزی نشانه ج", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/2-8.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/1-9.jpg", "desc": "کاربرگ پیش دبستانی زبان آموزی نشانه ج با تمرکز بر تقویت مهارت‌های شنیداری و زبانی در کودکان پیش‌دبستانی طراحی شده است. فعالیتی که در این صفحه ارائه شده، از"}, {"title": "کاربرگ پیش دبستانی صدا آموزی نشانه «ی»", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-پیش-دبستانی-صدا-آموزی-نشانه-ی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-پیش-دبستانی-صدا-آموزی-نشانه-ی.webp", "desc": "این کاربرگ پیش دبستانی صدا آموزی نشانه «ی» با هدف آشنایی نوآموزان با صدای ابتدایی این نشانه طراحی شده است. در این صفحه، کودک با مشاهده چند تصویر مختلف، باید"}, {"title": "کاربرگ پیش دبستانی ماز و دست ورزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_2881-copy.pdf", "source": "سمیه روحی"}, {"title": "2 کاربرگ پیش دبستانی مراحل رشد انسان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-پیش-دبستانی-مراحل-رشد-انسان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-پیش-دبستانی-مراحل-رشد-انسان.webp", "desc": "کاربرگ پیش دبستانی مراحل رشد انسان به‌طور ویژه برای کودکان پیش‌دبستانی و مهدکودک طراحی شده است. در این کاربرگ‌ها، کودکان با روند رشد انسان از نوزادی تا"}, {"title": "کاربرگ پیش دبستانی مراحل رشد مرغ", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-پیش-دبستانی-مراحل-رشد-مرغ.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش دبستانی مفهوم اعداد", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/a2943164-fdc7-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/45451.webp", "desc": "کاربرگ پیش دبستانی مفهوم اعداد با طراحی ساده و جذاب، به کودکان کمک می‌کند تا مهارت‌های اولیه مانند شمارش، تشخیص اشکال و مفاهیم پایه را یاد بگیرند."}, {"title": "کاربرگ پیش دبستانی هوش", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-4.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/08/پیش-دبستان-4.webp", "desc": "آیا به دنبال یک فعالیت آموزشی جذاب برای تقویت مهارت‌های مشاهده‌ای فرزند خود هستید؟ کاربرگ پیدا کردن تفاوت‌ها که در تصویر مشاهده می‌کنید، یک ابزار فوق‌العاده"}, {"title": "کاربرگ پیش دبستانی 2 &#8211; حیوانات اهلی و وحشی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-پیش-دبستانی-2.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-پیش-دبستانی-2.webp", "desc": "کاربرگ پیش دبستانی 2 با عنوان &quot;حیوانات اهلی و وحشی&quot; یک ابزار آموزشی و سرگرم‌کننده ایده‌آل برای کودکان در رده سنی پیش دبستانی (3 تا 6 سال) است."}, {"title": "نمونه کاربرگ پیش دبستان آشنایی با ساعت و مفهوم زمان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-45.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش دبستان آموزش عدد شش (۶)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-آموزش-عدد-شش.pdf", "source": "سمیه روحی"}, {"title": "کاربرگ پیش دبستان آموزش عدد هفت (۷)", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-پیش-دبستان-آموزش-عدد-هفت.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/04/کاربرگ-پیش-دبستان-آموزش-عدد-هفت.webp", "desc": "آموزش اعداد به کودکان پیش‌دبستانی یکی از مهم‌ترین قدم‌ها در یادگیری مفاهیم پایه ریاضی است. اگر به دنبال یک روش سرگرم‌کننده و جذاب برای آموزش عدد  هستید، این"}, {"title": "کاربرگ پیش دبستان بهداشت دهان و اهمیت مسواک زدن", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-19.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-22.webp", "desc": "کاربرگ پیش دبستان بهداشت دهان و اهمیت مسواک زدن دانش‌آموزان را با روش صحیح تمیز کردن دندان‌ها آشنا می‌شوند."}, {"title": "کاربرگ پیش دبستان زبان آموزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5249.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/06/IMG_5248.jpg", "desc": "کاربرگ پیش دبستان زبان آموزی با هدف آموزش صدای «م» طراحی شده و به کمک تصاویر دوست‌داشتنی و آشنا، به کودک کمک می‌کند تا به صورت بصری و شنیداری صدای آغازین"}, {"title": "کاربرگ چرخه آب و مراحل تشکیل باران پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-15.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-18.webp", "desc": "کاربرگ چرخه آب و مراحل تشکیل باران به موضوع مراحل تشکیل باران اختصاص دارد و هدف آن آشنایی دانش‌آموز با چرخه‌ی آب و بارش از طریق یک فعالیت تعاملی است."}, {"title": "کاربرگ چرخه آب پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/pdf-2025-12-19T172945.913.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/watermarked-2025-12-19T172844.141.webp", "desc": "کاربرگ چرخه آب پیش دبستانی بر پایه‌ی یک تصویر آموزشی از مراحل تشکیل باران و یک شعر کودکانه با موضوع آب و بارش طراحی شده است."}, {"title": "کاربرگ چرخه زندگی مرغ پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-چرخه-زندگی-مرغ-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-چرخه-زندگی-مرغ-پیش-دبستان.webp", "desc": "دنیای حیوانات و نحوه به وجود آمدن آن‌ها برای کودکان پیش‌دبستانی همیشه پر از رمز و راز و شگفتی است. کاربرگ چرخه زندگی مرغ پیش دبستان فرصتی عالی است تا کودک شما"}, {"title": "کاربرگ چرخه زندگی پروانه پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-چرخه-زندگی-پروانه-پیش-دبستان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-چرخه-زندگی-پروانه-پیش-دبستان.webp", "desc": "آیا تا به حال برق اشتیاق را در چشمان کودکان هنگام شنیدن داستان کرم کوچولویی که به پروانه‌ای زیبا تبدیل می‌شود، دیده‌اید؟ این کاربرگ چرخه زندگی پروانه پیش"}, {"title": "کاربرگ چرخه ی زندگی مرغ علوم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-چرخه-ی-زندگی-مرغ.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-چرخه-ی-زندگی-مرغ.webp", "desc": "برای دانلود رایگان فایل PDF کاربرگ چرخه ی زندگی مرغ، به انتهای صفحه مراجعه کنید."}, {"title": "کاربرگ کار با قیچی پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-کار-با-قیچی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-کار-با-قیچی.webp", "desc": "کاربرگ کار با قیچی پیش دبستانی برای تقویت مهارت‌های حرکتی کودک طراحی شده است. در این کاربرگ، کودکان با قیچی، اشکال مختلفی از جمله ماهی‌ها، گیاهان دریایی، قلعه"}, {"title": "ایده کاربرگ کتاب و کتابخوانی برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/01/pdf-28.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/01/watermarked-31.webp", "desc": "کاربرگ کتاب و کتابخوانی برای پیش دبستان درباره‌ی صحنه‌ای است که یک کودک روی مبل کنار پنجره نشسته و در حال خواندن کتاب است، در حالی که بیرون هوا آفتابی است و"}, {"title": "کاربرگ کمتر و بیشتر پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/IMG_5660-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/sample887y.webp", "desc": "کاربرگ کمتر و بیشتر پیش دبستانی یک ابزار آموزشی مناسب برای کودکان پیش دبستانی است که به آنها کمک میکند مفاهیم پایه ای مانند &quot;کمتر&quot; و &quot;بیشتر&quot; را یاد بگیرند."}, {"title": "کاربرگ گیاهان برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/04/656opy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/04/5878787y.webp", "desc": "این کاربرگ مربوط به چرخه زندگی چهار گیاه مختلف را برای کودکان پیش دبستانی نشان می دهد. هر ردیف مراحل رشد یک گیاه را از دانه تا گیاه بالغ و سپس تولید میوه یا گل با دانه های جدید نشان می دهد."}, {"title": "کاربرگ گیاهان پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/05/IMG_1388-copy.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/05/sam2322opy.webp", "desc": "کاربرگ گیاهان پیش دبستانی با هدف آشنایی کودکان پیش‌دبستانی با کاربردهای مختلف گیاهان در زندگی روزمره طراحی شده است."}, {"title": "کاربرگ ۱۳ آبان روز دانش آموز", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-۱۳-آبان-روز-دانش-آموز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-۱۳-آبان-روز-دانش-آموز.webp", "desc": "دانش‌آموزان عزیز ایران زمین امروز کاربرگ ۱۳ آبان روز دانش آموز رو براتون تهیه کردیم! روز شما، روز آغاز پرواز و شکفتن استعدادهاست. شما ستارگان درخشان فردای"}, {"title": "کاردستی به مناسبت عید سعید غدیر خم", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاردستی-به-مناسبت-عید-سعید-غدیر-خم.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/کاردستی-به-مناسبت-عید-سعید-غدیر-خم.webp", "desc": "عید غدیر، عید بزرگ ولایت، فرصتی است تا مفاهیم عمیق دینی را با زبان هنر و خلاقیت به کودکان انتقال دهیم. کاردستی «گلدان رولی غدیر» یک فعالیت هنری ساده، کم‌هزینه"}, {"title": "۵ کاربرگ رایگان روز دامپزشک", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/۵کاربرگ-رایگان-روز-دامپزشک.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/۵کاربرگ-رایگان-روز-دامپزشک.webp", "desc": "۵ کاربرگ رایگان روز دامپزشک برای کوکانی که مواظب حیوانات اطراف خود هستند، آماده کردیم.روز جهانی دامپزشک، که هر سال در آخرین شنبه ماه آوریل جشن گرفته می‌شود (و"}, {"title": "۵ کاربرگ رایگان هفته نیرو انتظامی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/۵کاربرگ-رایگان-هفته-نیرو-انتظامی-1.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/۵کاربرگ-رایگان-هفته-نیرو-انتظامی-1.webp", "desc": "۵ کاربرگ رایگان هفته نیرو انتظامی، فرصتی است تا بار دیگر از زحمات شبانه‌روزی و فداکاری‌های حافظان نظم و امنیت در سراسر کشور قدردانی کنیم. این هفته که با هدف"}, {"title": "۷ کاربرگ جذاب به مناسبت ماه مبارک رمضان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/۷-کاربرگ-جذاب-به-مناسبت-ماه-مبارک-رمضان-.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/۷-کاربرگ-جذاب-به-مناسبت-ماه-مبارک-رمضان.webp", "desc": "ماه رمضان فرصتی طلایی برای آشنایی کودکان با مفاهیم معنوی، اخلاقی و فرهنگی است. این مجموعه ۷ کاربرگ جذاب به مناسبت ماه مبارک رمضان با طراحی شاد و کودک‌پسند،"}, {"title": "13 کاربرگ دقت و تمرکز برای دانش آموزان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/06/13-کاربرگ-دقت-و-تمرکز.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/06/13-کاربرگ-دقت-و-تمرکز.webp", "desc": "اگر به دنبال راهی سرگرم‌کننده و آموزشی برای تقویت دقت، تمرکز و مهارت‌های مشاهده در کودکان هستید، مجموعه 13 کاربرگ دقت و تمرکز انتخابی فوق‌العاده برای شماست."}, {"title": "2 کاربرگ تفاوت ها برای پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تفاوت-ها-برای-پیش-دبستانی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-تفاوت-ها-برای-پیش-دبستانی.webp", "desc": "این کاربرگ تفاوت ها برای پیش دبستانی می‌تواند به صورت فردی یا گروهی انجام شود و فضای شاد و مفرحی برای یادگیری کودکان فراهم کند."}, {"title": "2 کاربرگ رنگ آمیزی روز نابینایان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-نابینایان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-نابینایان.webp", "desc": "این مجموعه کاربرگ رنگ آمیزی روز نابینایان شامل دو کاربرگ رنگ‌آمیزی با موضوع افراد نابینا و کم‌بینا است که برای ارتقای درک، همدلی، و آموزش مفاهیم اساسی استقلال"}, {"title": "3 کاربرگ رنگ آمیزی روز دختر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ‌آمیزی-روز-دختر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ‌آمیزی-روز-دختر.webp", "desc": "کاربرگ رنگ‌آمیزی روز دختر یک فعالیت آموزشی و سرگرم‌کننده است که به دختران این فرصت را می‌دهد تا مهارت‌های رنگ‌آمیزی خود را تقویت کنند"}, {"title": "3 کاربرگ روز جهانی استاندارد برای پیش دبستان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-استاندارد.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-استاندارد.webp", "desc": "کاربرگ روز جهانی استاندارد فرصتی عالی است تا کودکان با مفهوم استاندارد و اهمیت آن در زندگی روزمره آشنا شوند. استانداردها مجموعه‌ای از قوانین و دستورالعمل‌ها"}, {"title": "3 کاربرگ روز جهانی سالمندان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-روز-جهانی-سالمندان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/09/کاربرگ-روز-جهانی-سالمندان.webp", "desc": "کاربرگ روز جهانی سالمندان نه تنها به تقویت مهارت‌های رنگ‌آمیزی و خلاقیت کودکان کمک می‌کند بلکه فرصتی است تا بچه‌ها پیوندی عاطفی با سالمندان برقرار کنند."}, {"title": "3 کاربرگ روز جهانی هلال احمر", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/05/کاربرگ-روز-جهانی-هلال-احمر.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/05/3-کاربرگ-روز-جهانی-هلال-احمر.webp", "desc": "۱۸ اردیبهشت، روز جهانی صلیب سرخ و هلال‌احمر است؛ روزی که با مهربانی، همکاری و کمک به دیگران معنا پیدا می‌کند. این سه کاربرگ زیبا مخصوص کودکان طراحی شده‌اند تا"}, {"title": "3 کاربرگ روز جهانی کودک دخترانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-دخترانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-دخترانه.webp", "desc": "برای دانلود رایگان فایل PDF کاربرگ روز جهانی کودک دخترانه به انتهای همین صفحه مراجعه کنید."}, {"title": "3 کاربرگ روز جهانی کودک پسرانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-پسرانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-روز-جهانی-کودک-پسرانه.webp", "desc": "برای دانلود رایگان فایل PDF کاربرگ روز جهانی کودک پسرانه به انتهای همین صفحه مراجعه کنید."}, {"title": "3 کاربرگ روز مادر دخترانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-روز-مادر-دخترانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-روز-مادر-دخترانه.webp", "desc": "این سه کاربرگ رنگ‌آمیزی با موضوع دختر و مادر طراحی شده‌اند تا بچه‌ها بتوانند:"}, {"title": "3 کاربرگ روز مادر پسرانه", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-روز-مادر-پسرانه.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/12/کاربرگ-روز-مادر-پسرانه.webp", "desc": "پس مداد رنگی‌هاتون رو بردارید و این 3 کاربرگ روز مادر پسرانه رو با عشق رنگ کنید و به مامانتون تقدیم کنید. 💛🎨"}, {"title": "3 کاربرگ واحد کار بهار پیش دبستانی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-بهار.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-واحد-کار-بهار.webp", "desc": "می‌توانید از کاربرگ واحد کار بهار در کلاس پیش‌دبستانی، کارگاه‌های خلاقیت یا در منزل استفاده کنید و تجربه‌ای شاد و آموزشی از فصل بهار برای کودکان بسازید."}, {"title": "4 کاربرگ رنگ آمیزی روز جهانی پست", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-پست.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/10/کاربرگ-رنگ-آمیزی-روز-جهانی-پست.webp", "desc": "کاربرگ رنگ آمیزی روز جهانی پست یک فرصت عالی است تا کودکان با خدمات پست و نقش پستچی‌ها آشنا شوند. پست به عنوان یکی از ابزارهای ارتباطی مهم در جهان، به ما این"}, {"title": "4 کاربرگ رنگ آمیزی پسرانه ماه رمضان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/4-کاربرگ-رنگ-آمیزی-پسرانه-ماه-رمضان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/کاربرگ-رنگ-آمیزی-پسرانه-ماه-رمضان.webp", "desc": "کاربرگ رنگ آمیزی پسرانه ماه رمضان شامل ۴ کاربرگ رنگ‌آمیزی ویژه پسران با موضوع ماه مبارک رمضان و مفاهیم دینی است. طراحی این تصاویر به گونه‌ای است که علاوه بر"}, {"title": "5 کاربرگ رنگ آمیزی دخترانه ماه رمضان", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2026/02/5-کاربرگ-رنگ-آمیزی-دخترانه-ماه-رمضان.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2026/02/5-کاربرگ-رنگ-آمیزی-دخترانه-ماه-رمضان.webp", "desc": "کاربرگ رنگ آمیزی دخترانه ماه رمضان شامل ۵ کاربرگ رنگ‌آمیزی با موضوع ماه مبارک رمضان و آموزه‌های دینی است که با طراحی جذاب و کودکانه برای دختران آماده شده است."}, {"title": "6 کاربرگ رنگ آمیزی برگ های پاییزی", "type": "pdf", "category": "کاربرگ", "audience": "کودک", "age": "پیش‌دبستان", "room": "amoozesh", "url": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-برگ-های-پاییزی.pdf", "source": "سمیه روحی", "image": "https://somayehrouhi.ir/wp-content/uploads/2025/11/کاربرگ-رنگ-آمیزی-برگ-های-پاییزی.webp", "desc": "اگر به دنبال فعالیتی جذاب و آموزنده برای فصل پاییز هستید، پکیج کاربرگ رنگ‌آمیزی برگ‌های پاییزی بهترین انتخاب است!این مجموعه شامل ۶ تصویر جذاب و باکیفیت از"}, {"title": "شناخت رنگ‌های اصلی", "type": "activity", "category": "شناخت رنگ", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "ترکیب رنگ‌ها", "type": "activity", "category": "شناخت رنگ", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شناخت فصل‌ها", "type": "activity", "category": "شناخت طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شناخت حیوانات", "type": "activity", "category": "شناخت طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شمارش ۱ تا ۱۰", "type": "activity", "category": "شناخت اعداد", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "نوشتن عدد ۱ تا ۵", "type": "activity", "category": "شناخت اعداد", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شناخت حروف الفبا", "type": "activity", "category": "شناخت حروف", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "ردیابی حرف", "type": "activity", "category": "شناخت حروف", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شناخت شکل‌های هندسی", "type": "activity", "category": "شناخت شکل", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "دسته‌بندی اشیاء", "type": "activity", "category": "مهارت شناختی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "بیان احساسات", "type": "activity", "category": "مهارت عاطفی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "حل مسئله ساده", "type": "activity", "category": "مهارت شناختی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "لباس مناسب فصل", "type": "activity", "category": "مهارت زندگی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "شستن دست‌ها", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "مسواک زدن", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "amoozesh", "source": "خانه یادگیری"}, {"title": "کاربرگ رنگ‌آمیزی فصل‌ها", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کاربرگ ردیابی حروف الفبا", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کاربرگ شمارش اعداد", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کاربرگ الگوها", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "گواهی مشارکت", "type": "activity", "category": "گواهی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "گواهی پایان دوره", "type": "activity", "category": "گواهی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "آلبوم نقاشی‌های من", "type": "activity", "category": "آلبوم کار", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کارنامه تصویری رشد", "type": "activity", "category": "آلبوم کار", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کارت‌های تصویری حیوانات", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "کارت‌های تصویری میوه‌ها", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "برنامه هفتگی تصویری", "type": "activity", "category": "کاربرگ چاپی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "دفترچه احساسات", "type": "activity", "category": "آلبوم کار", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم ثبت‌نام کودک", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم ارزیابی ورودی (پیش‌آزمون)", "type": "activity", "category": "فرم‌های ارزیابی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم پیگیری وضعیت ساعتی کودک", "type": "activity", "category": "فرم‌های روزانه", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم گزارش روزانه به والد", "type": "activity", "category": "فرم‌های روزانه", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم گزارش هفتگی رشد و احساس", "type": "activity", "category": "فرم‌های ارزیابی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم چک‌لیست ارزیابی ۵ حوزه رشد", "type": "activity", "category": "فرم‌های ارزیابی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم انتقال اطلاعات بین مربیان (تحویل شیفت)", "type": "activity", "category": "فرم‌های روزانه", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم پیام مربی به والد (دفتر ارتباط)", "type": "activity", "category": "فرم‌های ارتباطی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم رضایت‌نامه والدین", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم معرفی به متخصص (گفتار/کاردرمانی)", "type": "activity", "category": "فرم‌های ارزیابی", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم پیگیری وضعیت ساعتی (نسخه مدیر)", "type": "activity", "category": "فرم‌های روزانه", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم گزارش ماهانه به مدیر", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم برنامه روزانه کلاس", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم چک‌لیست ایمنی و بهداشت روزانه", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "فرم جلسه اولیا و مربیان", "type": "activity", "category": "فرم‌های اداری", "audience": "کودک", "age": "2-6 سال", "room": "bayegani", "source": "خانه یادگیری"}, {"title": "دالی موشه", "type": "activity", "category": "بازی اجتماعی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "پازل اشکال ساده", "type": "activity", "category": "بازی فکری", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "بلوک چینی", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "قایم موشک", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "توپ غلطان", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "مربا/خمیربازی", "type": "activity", "category": "بازی خلاقانه", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "لالایی و ترانه‌های حرکتی", "type": "activity", "category": "بازی موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "جعبه جادویی", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "سطل و بیل", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "آینه بازی", "type": "activity", "category": "بازی اجتماعی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "شمارش انگشتی", "type": "activity", "category": "بازی آموزشی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "بازی نام‌بردن", "type": "activity", "category": "بازی زبانی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "جورچین دستهدار", "type": "activity", "category": "بازی فکری", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "حرکت حیوانات", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "خداحافظی و سلام", "type": "activity", "category": "بازی اجتماعی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "سیمون می‌گه", "type": "activity", "category": "بازی گروهی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "پازل ۴-۸ تکه", "type": "activity", "category": "بازی فکری", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "الگو و دنباله", "type": "activity", "category": "بازی آموزشی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "بازی حافظه", "type": "activity", "category": "بازی فکری", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "حدس صدا", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "bazi", "source": "خانه یادگیری"}, {"title": "نفس عمیق ۴-۷-۸", "type": "activity", "category": "تکنیک آرام‌سازی سریع", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "آرام‌سازی سریع در کلاس", "type": "activity", "category": "تکنیک آرام‌سازی سریع", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "شناسایی نشانه‌های فرسودگی", "type": "activity", "category": "مدیریت استرس", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "مرز بین کار و زندگی", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "وقفه‌های کوتاه روزانه", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "جبران انرژی روزانه", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "مدیریت خشم در لحظه", "type": "activity", "category": "مدیریت استرس", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "مدیتیشن کوتاه قبل از کلاس", "type": "activity", "category": "تکنیک آرام‌سازی سریع", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "حمایت همکاران", "type": "activity", "category": "مدیریت استرس", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "بازبینی پایان روز", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "تغذیه مربی", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "استراحت واقعی", "type": "activity", "category": "خودمراقبتی", "audience": "کودک", "age": "2-6 سال", "room": "esterahat-moraabian", "source": "خانه یادگیری"}, {"title": "گرگم به هوا", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "وسطی", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "لی‌لی", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "قایم موشک", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "جستجوی گنج طبیعت", "type": "activity", "category": "طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "کاشت بذر در گلدان", "type": "activity", "category": "طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "حباب‌سازی", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "شن‌بازی", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "بازی آب", "type": "activity", "category": "بازی حسی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "دوز", "type": "activity", "category": "بازی فکری", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "نقاشی با گچ روی زمین", "type": "activity", "category": "هنر در حیاط", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "بادبادک‌بازی", "type": "activity", "category": "طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "بازی با برگ‌ها", "type": "activity", "category": "طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "مشاهده حشرات", "type": "activity", "category": "طبیعت", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "بازی توپ و دیوار", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "غلت‌زدن روی چمن", "type": "activity", "category": "بازی حرکتی", "audience": "کودک", "age": "2-6 سال", "room": "hayat", "source": "خانه یادگیری"}, {"title": "سر و شونه زانو پا", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آهویی دارم خوشگله", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "بارون بارونه", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "عروسک خوشگله من", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "اتل متل توتوله", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "خورشید خانوم", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "بچرخ و بچرخ", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "دست میزنیم، پا میکوبیم", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "پنج تا مرغابی", "type": "activity", "category": "موسیقی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "عروسک جورابی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "قایق پوست گردو", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "نقاشی با انگشت", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "عروسک دستی کاغذی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "تاج مقوایی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آویز رولی دستمال‌کاغذی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "خمیر بازی خانگی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "مهره‌های گردن‌آویز ماکارونی", "type": "activity", "category": "کاردستی", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "قصه‌گویی با عروسک دستی", "type": "activity", "category": "نمایش", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "سایه‌بازی", "type": "activity", "category": "نمایش", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "نمایش شلغم", "type": "activity", "category": "نمایش", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "قصه‌سازی مشارکتی", "type": "activity", "category": "نمایش", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "بازی نقش (دکتر/فروشنده)", "type": "activity", "category": "نمایش", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آموزش بلز (Orff) — ریتم و حرکات", "type": "activity", "category": "موسیقی بلز", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آموزش بلز — صدای طبیعت با ساز", "type": "activity", "category": "موسیقی بلز", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آموزش بلز — آواز و شعر با حرکات", "type": "activity", "category": "موسیقی بلز", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "نمایش خلاق — داستان‌سازی با عروسک سایه", "type": "activity", "category": "نمایش خلاق", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "نمایش خلاق — تمساح و طبیعت", "type": "activity", "category": "نمایش خلاق", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "نمایش خلاق — ما در فضا", "type": "activity", "category": "نمایش خلاق", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آشپزی ساده — سالاد میوه رنگارنگ", "type": "activity", "category": "آشپزی ساده", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آشپزی ساده — نان پیتا و پنیر", "type": "activity", "category": "آشپزی ساده", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آشپزی ساده — کوکی ساده شیرینی", "type": "activity", "category": "آشپزی ساده", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آزمایش علوم — باران در کاسه", "type": "activity", "category": "آزمایش علوم", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آزمایش علوم — اثر پروانه (بافوم و سرکه)", "type": "activity", "category": "آزمایش علوم", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آزمایش علوم — مغناطیس و فلزات", "type": "activity", "category": "آزمایش علوم", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "آزمایش علوم — رنگ‌های جادویی (قلم‌رو و آب)", "type": "activity", "category": "آزمایش علوم", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "کاردستی — کاغذ ماشه (پیه‌ماشه)", "type": "activity", "category": "کاردستی پیشرفته", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "کاردستی — چاپ با سبزیجات و میوه", "type": "activity", "category": "کاردستی پیشرفته", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "کاردستی — קולاجطبیعت (Nature Collage)", "type": "activity", "category": "کاردستی پیشرفته", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "کاردستی — مجسمه خمیر بازی (Playdough Sculpture)", "type": "activity", "category": "کاردستی پیشرفته", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "کاردستی — نقاشی با ابزارهای غیرمتعارف", "type": "activity", "category": "کاردستی پیشرفته", "audience": "کودک", "age": "2-6 سال", "room": "honar", "source": "خانه یادگیری"}, {"title": "فرزندپروری بدون تنبیه", "type": "activity", "category": "فرزندپروری", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "مرزهای سالم", "type": "activity", "category": "فرزندپروری", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "زمان با کیفیت", "type": "activity", "category": "فرزندپروری", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "گفتگو درباره احساسات", "type": "activity", "category": "فرزندپروری", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "ارتباط با مهدکودک", "type": "activity", "category": "ارتباط والد-مهد", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: آمادگی برای پیش‌دبستانی", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: تغذیه سالم", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: مدیریت رفتار", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: خواب کودک", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: بازی و یادگیری", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "موضوع جلسه: ایمنی کودک در خانه", "type": "activity", "category": "موضوع جلسه", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "همکاری خانه و مهد", "type": "activity", "category": "ارتباط والد-مهد", "audience": "کودک", "age": "2-6 سال", "room": "jalase-owlia", "source": "خانه یادگیری"}, {"title": "لالایی لالا", "type": "activity", "category": "لالایی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "لایی لایی گل پونه", "type": "activity", "category": "لالایی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "ناز نازک من", "type": "activity", "category": "لالایی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "قصه خواب آرام", "type": "activity", "category": "قصه خواب", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "قصه‌سازی خواب", "type": "activity", "category": "قصه خواب", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "نفس عمیق آرامش‌بخش", "type": "activity", "category": "آرام‌سازی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "آرام‌سازی عضلات", "type": "activity", "category": "آرام‌سازی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "آیین خواب منظم", "type": "activity", "category": "آرام‌سازی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "موسیقی آرام بدون کلام", "type": "activity", "category": "موسیقی آرام", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "صدای باران آرام", "type": "activity", "category": "موسیقی آرام", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "شمارش ستاره‌ها", "type": "activity", "category": "آرام‌سازی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "لالایی محلی (کردی/آذری/لری)", "type": "activity", "category": "لالایی", "audience": "کودک", "age": "2-6 سال", "room": "khab", "source": "خانه یادگیری"}, {"title": "مدیریت رفتار بدون تنبیه", "type": "activity", "category": "مدیریت کلاس", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "مشاهده و مستندسازی", "type": "activity", "category": "ارزیابی رشد", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "برنامه‌ریزی فعالیت هفتگی", "type": "activity", "category": "مدیریت کلاس", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "ارزیابی رشد کودک", "type": "activity", "category": "ارزیابی رشد", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "ارتباط با والد", "type": "activity", "category": "ارتباط", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "آموزش فراگیر", "type": "activity", "category": "تکنیک تربیتی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "ایمنی و بهداشت کلاس", "type": "activity", "category": "مدیریت کلاس", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "آگاهی واجی (آمادگی خواندن)", "type": "activity", "category": "تکنیک تربیتی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "تنظیم هیجان مربی", "type": "activity", "category": "تکنیک تربیتی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "گزارش پیشرفت به والد", "type": "activity", "category": "ارتباط", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "دعوت به جلسه اولیا", "type": "activity", "category": "ارتباط", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "فعالیت آماده: کارگاه حسی", "type": "activity", "category": "فعالیت آماده", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "فعالیت آماده: باغچه کلاسی", "type": "activity", "category": "فعالیت آماده", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "مدیریت زمان کلاس", "type": "activity", "category": "مدیریت کلاس", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "شناسایی اولیه نیازهای ویژه کودک", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "برنامه آموزشی فردی (IEP) برای کودک استثنایی", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "فعالیت‌های حسی برای کودکان اوتیسم", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "تقویت مهارت‌های اجتماعی کودکان استثنایی", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "مدیریت رفتار چالشی (خودآزاری/پرخاشگری)", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "ارتباط جایگزین (AAC) برای کودکان بی‌کلام", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "تقویت مهارت‌های حرکتی ظریف (کاردرمانی ساده)", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "برنامه زمان‌بندی بصری (Visual Schedule)", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "گزارش پیشرفت کودکان استثنایی به والدین", "type": "activity", "category": "کودکان استثنایی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "فرم چک‌لیست رفتاری کودکان استثنایی", "type": "activity", "category": "فرم‌های ارزیابی", "audience": "کودک", "age": "2-6 سال", "room": "moraabi", "source": "خانه یادگیری"}, {"title": "قصه‌گویی قبل از خواب", "type": "activity", "category": "قصه‌گویی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "کتاب‌خوانی تعاملی", "type": "activity", "category": "کتاب‌خوانی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "شعر کودکانه فارسی", "type": "activity", "category": "شعر", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "نمایش عروسکی", "type": "activity", "category": "نمایش عروسکی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "کلیله و دمنه (بازنویسی)", "type": "activity", "category": "قصه‌گویی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "داستان زال و سیمرغ", "type": "activity", "category": "قصه‌گویی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "داستان خاله سوسکه", "type": "activity", "category": "قصه‌گویی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "ربات انسانی (Unplugged Coding)", "type": "activity", "category": "هوش دیجیتال", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "الگوی رقص (Unplugged Coding)", "type": "activity", "category": "هوش دیجیتال", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "ماز کف زمین (Unplugged Coding)", "type": "activity", "category": "هوش دیجیتال", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "مرتب‌سازی اشیا (Unplugged Coding)", "type": "activity", "category": "هوش دیجیتال", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "کارت دستور غذا (Unplugged Coding)", "type": "activity", "category": "هوش دیجیتال", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "شعر با قافیه", "type": "activity", "category": "شعر", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "داستان‌سازی گروهی", "type": "activity", "category": "قصه‌گویی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "کتابخانه کوچولو", "type": "activity", "category": "کتاب‌خوانی", "audience": "کودک", "age": "2-6 سال", "room": "motaleh", "source": "خانه یادگیری"}, {"title": "شستن دست‌ها", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "مسواک زدن", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "عطسه و سرفه آداب", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "بشقاب سالم", "type": "activity", "category": "تغذیه", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "میوه‌های رنگارنگ", "type": "activity", "category": "تغذیه", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "خواب کافی", "type": "activity", "category": "عادت سالم", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "ورزش صبحگاهی", "type": "activity", "category": "عادت سالم", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "نوشیدن آب", "type": "activity", "category": "عادت سالم", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "بازی حرکت و ایست", "type": "activity", "category": "عادت سالم", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "گفتگو درباره بدن من", "type": "activity", "category": "آموزش ایمنی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "کمک خواستن", "type": "activity", "category": "آموزش ایمنی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "چراغ راهنمایی", "type": "activity", "category": "آموزش ایمنی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "ناخن کوتاه", "type": "activity", "category": "بهداشت شخصی", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "غذای متنوع", "type": "activity", "category": "تغذیه", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "وقت بازی در فضای باز", "type": "activity", "category": "عادت سالم", "audience": "کودک", "age": "2-6 سال", "room": "salamat", "source": "خانه یادگیری"}, {"title": "آشنایی با میوه‌ها", "type": "activity", "category": "آشنایی با میوه و سبزی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "آشنایی با سبزیجات", "type": "activity", "category": "آشنایی با میوه و سبزی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "شستن دست قبل از غذا", "type": "activity", "category": "آداب غذا", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "آداب سفره", "type": "activity", "category": "آداب غذا", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "بشقاب سالم", "type": "activity", "category": "بازی غذایی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "بازی حدس میوه با چشم بسته", "type": "activity", "category": "بازی غذایی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "ساخت میان‌وعده میوه‌ای", "type": "activity", "category": "بازی غذایی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "نوشیدن آب", "type": "activity", "category": "عادت غذایی سالم", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "جویدن کامل غذا", "type": "activity", "category": "عادت غذایی سالم", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "غذای رنگارنگ", "type": "activity", "category": "عادت غذایی سالم", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "تشکر بعد از غذا", "type": "activity", "category": "آداب غذا", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "بازی طبقه‌بندی میوه و سبزی", "type": "activity", "category": "بازی غذایی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "معرفی طعم‌های مختلف", "type": "activity", "category": "بازی غذایی", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "داستان غذاها", "type": "activity", "category": "عادت غذایی سالم", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "آشپزی ساده: ساندویچ میوه", "type": "activity", "category": "آشپزی ساده", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "آشپزی ساده: بستنی میوه‌ای خانگی", "type": "activity", "category": "آشپزی ساده", "audience": "کودک", "age": "2-6 سال", "room": "teria", "source": "خانه یادگیری"}, {"title": "بازی حافظه تصویری", "type": "game", "category": "بازی", "audience": "کودک", "age": "4-6 سال", "room": "bazi", "source": "یاران"}, {"title": "پازل حیوانات", "type": "game", "category": "بازی", "audience": "کودک", "age": "3-5 سال", "room": "bazi", "source": "یاران"}, {"title": "بازی شمارش", "type": "game", "category": "بازی", "audience": "کودک", "age": "4-5 سال", "room": "bazi", "source": "یاران"}, {"title": "بازی ترکیب رنگ‌ها", "type": "game", "category": "بازی", "audience": "کودک", "age": "3-5 سال", "room": "honar", "source": "یاران"}, {"title": "فرم ارزیابی رشد کودک", "type": "pdf", "category": "فرم", "audience": "مربی", "age": "-", "room": "moraabi", "source": "یاران"}, {"title": "فرم گزارش روزانه", "type": "pdf", "category": "فرم", "audience": "مربی", "age": "-", "room": "moraabi", "source": "یاران"}, {"title": "فرم پایش قد و وزن", "type": "pdf", "category": "فرم", "audience": "مربی", "age": "-", "room": "salamat", "source": "یاران"}, {"title": "فرم نظرسنجی والدین", "type": "pdf", "category": "فرم", "audience": "والد", "age": "-", "room": "jalase-owlia", "source": "یاران"}, {"title": "راهنمای تربیت پیش‌دبستانی", "type": "pdf", "category": "راهنما", "audience": "مربی", "age": "-", "room": "moraabi", "source": "یاران"}, {"title": "راهنمای تغذیه سالم", "type": "pdf", "category": "راهنما", "audience": "مربی", "age": "-", "room": "salamat", "source": "یاران"}, {"title": "چک‌لیست ایمنی حیاط", "type": "pdf", "category": "راهنما", "audience": "مربی", "age": "-", "room": "hayat", "source": "یاران"},
  {
    "title": "اپیزود 980658695",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id980658695",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 975959343",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id975959343",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 969552517",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id969552517",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 950923486",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id950923486",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 904811477",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id904811477",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 883839982",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id883839982",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 875717968",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id875717968",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 858736690",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id858736690",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 837303126",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id837303126",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 827087926",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id827087926",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 822063266",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id822063266",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 822062786",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id822062786",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 810196469",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id810196469",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 802313958",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id802313958",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 799245460",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id799245460",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 789430483",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id789430483",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 786370915",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id786370915",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 784259218",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id784259218",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 780153213",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id780153213",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 770781679",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "همراه مادر و کودک",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id770781679",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 982296852",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id982296852",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 981439217",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id981439217",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 980561923",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id980561923",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 980132568",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id980132568",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 979540965",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id979540965",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 979001528",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id979001528",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 977920840",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id977920840",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 977401806",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id977401806",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 976871503",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976871503",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 976685929",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976685929",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 976193543",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976193543",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 975798292",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id975798292",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 975191680",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id975191680",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 974725378",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id974725378",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 974150555",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id974150555",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 973851244",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id973851244",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 973333235",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id973333235",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 972952318",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972952318",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 972627768",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972627768",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 972220621",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "داستان شب کودک",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972220621",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 963124815",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963124815",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 963095709",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963095709",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 963070365",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963070365",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 963013426",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963013426",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 962985326",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962985326",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 962966883",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962966883",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 962957775",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962957775",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 962946414",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962946414",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956890071",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956890071",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956641694",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956641694",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956640456",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956640456",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956637845",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956637845",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956621503",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956621503",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 956618836",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956618836",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 950460873",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id950460873",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 902355441",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id902355441",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 902255071",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id902255071",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 889576964",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id889576964",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 884537169",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id884537169",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 883902201",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب گویا",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id883902201",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 957067472",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "دارما کودک",
    "url": "https://castbox.fm/episode/دارما-کودک-و-نوجوان-|-Dharma-Kids-id957067472",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 955896081",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "دارما کودک",
    "url": "https://castbox.fm/episode/دارما-کودک-و-نوجوان-|-Dharma-Kids-id955896081",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 961337962",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id961337962",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409160",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409160",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409159",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409159",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409158",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409158",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409157",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409157",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409156",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409156",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409155",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409155",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409154",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409154",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409153",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409153",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409152",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409152",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 452409151",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "قصه‌های شبانه",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409151",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 880375747",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id880375747",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 779263991",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id779263991",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 774858288",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id774858288",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 774244992",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id774244992",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 769910776",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id769910776",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 769910403",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id769910403",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 763391918",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id763391918",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 763391497",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id763391497",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 753914891",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id753914891",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 703596820",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id703596820",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 699171298",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id699171298",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 694108251",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id694108251",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 690324966",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id690324966",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 683685268",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id683685268",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 679816377",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id679816377",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 674998651",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id674998651",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 672723066",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id672723066",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 669059373",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id669059373",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 666539190",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id666539190",
    "desc": "",
    "playable": true
  },
  {
    "title": "اپیزود 663161061",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "source": "کست‌باکس",
    "channel": "کتاب صوتی کودک",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id663161061",
    "desc": "",
    "playable": true
  }
,
  {
    "id": "castbox-2538237-980658695",
    "title": "اپیزود 980658695",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id980658695",
    "playable": true
  },
  {
    "id": "castbox-2538237-975959343",
    "title": "اپیزود 975959343",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id975959343",
    "playable": true
  },
  {
    "id": "castbox-2538237-969552517",
    "title": "اپیزود 969552517",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id969552517",
    "playable": true
  },
  {
    "id": "castbox-2538237-950923486",
    "title": "اپیزود 950923486",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id950923486",
    "playable": true
  },
  {
    "id": "castbox-2538237-904811477",
    "title": "اپیزود 904811477",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id904811477",
    "playable": true
  },
  {
    "id": "castbox-2538237-883839982",
    "title": "اپیزود 883839982",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id883839982",
    "playable": true
  },
  {
    "id": "castbox-2538237-875717968",
    "title": "اپیزود 875717968",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id875717968",
    "playable": true
  },
  {
    "id": "castbox-2538237-858736690",
    "title": "اپیزود 858736690",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id858736690",
    "playable": true
  },
  {
    "id": "castbox-2538237-837303126",
    "title": "اپیزود 837303126",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id837303126",
    "playable": true
  },
  {
    "id": "castbox-2538237-827087926",
    "title": "اپیزود 827087926",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id827087926",
    "playable": true
  },
  {
    "id": "castbox-2538237-822063266",
    "title": "اپیزود 822063266",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id822063266",
    "playable": true
  },
  {
    "id": "castbox-2538237-822062786",
    "title": "اپیزود 822062786",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id822062786",
    "playable": true
  },
  {
    "id": "castbox-2538237-810196469",
    "title": "اپیزود 810196469",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id810196469",
    "playable": true
  },
  {
    "id": "castbox-2538237-802313958",
    "title": "اپیزود 802313958",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id802313958",
    "playable": true
  },
  {
    "id": "castbox-2538237-799245460",
    "title": "اپیزود 799245460",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id799245460",
    "playable": true
  },
  {
    "id": "castbox-2538237-789430483",
    "title": "اپیزود 789430483",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id789430483",
    "playable": true
  },
  {
    "id": "castbox-2538237-786370915",
    "title": "اپیزود 786370915",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id786370915",
    "playable": true
  },
  {
    "id": "castbox-2538237-784259218",
    "title": "اپیزود 784259218",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id784259218",
    "playable": true
  },
  {
    "id": "castbox-2538237-780153213",
    "title": "اپیزود 780153213",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id780153213",
    "playable": true
  },
  {
    "id": "castbox-2538237-770781679",
    "title": "اپیزود 770781679",
    "description": "",
    "channel": "همراه مادر و کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id770781679",
    "playable": true
  },
  {
    "id": "castbox-4801837-982296852",
    "title": "اپیزود 982296852",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id982296852",
    "playable": true
  },
  {
    "id": "castbox-4801837-981439217",
    "title": "اپیزود 981439217",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id981439217",
    "playable": true
  },
  {
    "id": "castbox-4801837-980561923",
    "title": "اپیزود 980561923",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id980561923",
    "playable": true
  },
  {
    "id": "castbox-4801837-980132568",
    "title": "اپیزود 980132568",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id980132568",
    "playable": true
  },
  {
    "id": "castbox-4801837-979540965",
    "title": "اپیزود 979540965",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id979540965",
    "playable": true
  },
  {
    "id": "castbox-4801837-979001528",
    "title": "اپیزود 979001528",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id979001528",
    "playable": true
  },
  {
    "id": "castbox-4801837-977920840",
    "title": "اپیزود 977920840",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id977920840",
    "playable": true
  },
  {
    "id": "castbox-4801837-977401806",
    "title": "اپیزود 977401806",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id977401806",
    "playable": true
  },
  {
    "id": "castbox-4801837-976871503",
    "title": "اپیزود 976871503",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976871503",
    "playable": true
  },
  {
    "id": "castbox-4801837-976685929",
    "title": "اپیزود 976685929",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976685929",
    "playable": true
  },
  {
    "id": "castbox-4801837-976193543",
    "title": "اپیزود 976193543",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id976193543",
    "playable": true
  },
  {
    "id": "castbox-4801837-975798292",
    "title": "اپیزود 975798292",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id975798292",
    "playable": true
  },
  {
    "id": "castbox-4801837-975191680",
    "title": "اپیزود 975191680",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id975191680",
    "playable": true
  },
  {
    "id": "castbox-4801837-974725378",
    "title": "اپیزود 974725378",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id974725378",
    "playable": true
  },
  {
    "id": "castbox-4801837-974150555",
    "title": "اپیزود 974150555",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id974150555",
    "playable": true
  },
  {
    "id": "castbox-4801837-973851244",
    "title": "اپیزود 973851244",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id973851244",
    "playable": true
  },
  {
    "id": "castbox-4801837-973333235",
    "title": "اپیزود 973333235",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id973333235",
    "playable": true
  },
  {
    "id": "castbox-4801837-972952318",
    "title": "اپیزود 972952318",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972952318",
    "playable": true
  },
  {
    "id": "castbox-4801837-972627768",
    "title": "اپیزود 972627768",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972627768",
    "playable": true
  },
  {
    "id": "castbox-4801837-972220621",
    "title": "اپیزود 972220621",
    "description": "",
    "channel": "داستان شب کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/داستان-شب-کودک-id972220621",
    "playable": true
  },
  {
    "id": "castbox-4804029-963124815",
    "title": "اپیزود 963124815",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963124815",
    "playable": true
  },
  {
    "id": "castbox-4804029-963095709",
    "title": "اپیزود 963095709",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963095709",
    "playable": true
  },
  {
    "id": "castbox-4804029-963070365",
    "title": "اپیزود 963070365",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963070365",
    "playable": true
  },
  {
    "id": "castbox-4804029-963013426",
    "title": "اپیزود 963013426",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id963013426",
    "playable": true
  },
  {
    "id": "castbox-4804029-962985326",
    "title": "اپیزود 962985326",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962985326",
    "playable": true
  },
  {
    "id": "castbox-4804029-962966883",
    "title": "اپیزود 962966883",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962966883",
    "playable": true
  },
  {
    "id": "castbox-4804029-962957775",
    "title": "اپیزود 962957775",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962957775",
    "playable": true
  },
  {
    "id": "castbox-4804029-962946414",
    "title": "اپیزود 962946414",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id962946414",
    "playable": true
  },
  {
    "id": "castbox-4804029-956890071",
    "title": "اپیزود 956890071",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956890071",
    "playable": true
  },
  {
    "id": "castbox-4804029-956641694",
    "title": "اپیزود 956641694",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956641694",
    "playable": true
  },
  {
    "id": "castbox-4804029-956640456",
    "title": "اپیزود 956640456",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956640456",
    "playable": true
  },
  {
    "id": "castbox-4804029-956637845",
    "title": "اپیزود 956637845",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956637845",
    "playable": true
  },
  {
    "id": "castbox-4804029-956621503",
    "title": "اپیزود 956621503",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956621503",
    "playable": true
  },
  {
    "id": "castbox-4804029-956618836",
    "title": "اپیزود 956618836",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id956618836",
    "playable": true
  },
  {
    "id": "castbox-4804029-950460873",
    "title": "اپیزود 950460873",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id950460873",
    "playable": true
  },
  {
    "id": "castbox-4804029-902355441",
    "title": "اپیزود 902355441",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id902355441",
    "playable": true
  },
  {
    "id": "castbox-4804029-902255071",
    "title": "اپیزود 902255071",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id902255071",
    "playable": true
  },
  {
    "id": "castbox-4804029-889576964",
    "title": "اپیزود 889576964",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id889576964",
    "playable": true
  },
  {
    "id": "castbox-4804029-884537169",
    "title": "اپیزود 884537169",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id884537169",
    "playable": true
  },
  {
    "id": "castbox-4804029-883902201",
    "title": "اپیزود 883902201",
    "description": "",
    "channel": "کتاب گویا",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کودک-کتاب-گویا---داستان-برای-بچه-ها-id883902201",
    "playable": true
  },
  {
    "id": "castbox-3780344-957067472",
    "title": "اپیزود 957067472",
    "description": "",
    "channel": "دارما کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/دارما-کودک-و-نوجوان-|-Dharma-Kids-id957067472",
    "playable": true
  },
  {
    "id": "castbox-3780344-955896081",
    "title": "اپیزود 955896081",
    "description": "",
    "channel": "دارما کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/دارما-کودک-و-نوجوان-|-Dharma-Kids-id955896081",
    "playable": true
  },
  {
    "id": "castbox-4717891-961337962",
    "title": "اپیزود 961337962",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id961337962",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409160",
    "title": "اپیزود 452409160",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409160",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409159",
    "title": "اپیزود 452409159",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409159",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409158",
    "title": "اپیزود 452409158",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409158",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409157",
    "title": "اپیزود 452409157",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409157",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409156",
    "title": "اپیزود 452409156",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409156",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409155",
    "title": "اپیزود 452409155",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409155",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409154",
    "title": "اپیزود 452409154",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409154",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409153",
    "title": "اپیزود 452409153",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409153",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409152",
    "title": "اپیزود 452409152",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409152",
    "playable": true
  },
  {
    "id": "castbox-4717891-452409151",
    "title": "اپیزود 452409151",
    "description": "",
    "channel": "قصه‌های شبانه",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/✨-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id452409151",
    "playable": true
  },
  {
    "id": "castbox-5558670-880375747",
    "title": "اپیزود 880375747",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id880375747",
    "playable": true
  },
  {
    "id": "castbox-5558670-779263991",
    "title": "اپیزود 779263991",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id779263991",
    "playable": true
  },
  {
    "id": "castbox-5558670-774858288",
    "title": "اپیزود 774858288",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id774858288",
    "playable": true
  },
  {
    "id": "castbox-5558670-774244992",
    "title": "اپیزود 774244992",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id774244992",
    "playable": true
  },
  {
    "id": "castbox-5558670-769910776",
    "title": "اپیزود 769910776",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id769910776",
    "playable": true
  },
  {
    "id": "castbox-5558670-769910403",
    "title": "اپیزود 769910403",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id769910403",
    "playable": true
  },
  {
    "id": "castbox-5558670-763391918",
    "title": "اپیزود 763391918",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id763391918",
    "playable": true
  },
  {
    "id": "castbox-5558670-763391497",
    "title": "اپیزود 763391497",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id763391497",
    "playable": true
  },
  {
    "id": "castbox-5558670-753914891",
    "title": "اپیزود 753914891",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id753914891",
    "playable": true
  },
  {
    "id": "castbox-5558670-703596820",
    "title": "اپیزود 703596820",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id703596820",
    "playable": true
  },
  {
    "id": "castbox-5558670-699171298",
    "title": "اپیزود 699171298",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id699171298",
    "playable": true
  },
  {
    "id": "castbox-5558670-694108251",
    "title": "اپیزود 694108251",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id694108251",
    "playable": true
  },
  {
    "id": "castbox-5558670-690324966",
    "title": "اپیزود 690324966",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id690324966",
    "playable": true
  },
  {
    "id": "castbox-5558670-683685268",
    "title": "اپیزود 683685268",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id683685268",
    "playable": true
  },
  {
    "id": "castbox-5558670-679816377",
    "title": "اپیزود 679816377",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id679816377",
    "playable": true
  },
  {
    "id": "castbox-5558670-674998651",
    "title": "اپیزود 674998651",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id674998651",
    "playable": true
  },
  {
    "id": "castbox-5558670-672723066",
    "title": "اپیزود 672723066",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id672723066",
    "playable": true
  },
  {
    "id": "castbox-5558670-669059373",
    "title": "اپیزود 669059373",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id669059373",
    "playable": true
  },
  {
    "id": "castbox-5558670-666539190",
    "title": "اپیزود 666539190",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id666539190",
    "playable": true
  },
  {
    "id": "castbox-5558670-663161061",
    "title": "اپیزود 663161061",
    "description": "",
    "channel": "کتاب صوتی کودک",
    "type": "audio",
    "category": "قصه",
    "audience": "کودک",
    "age": "۳-۱۲ سال",
    "duration": "۱۰-۳۰ دقیقه",
    "source": "کست‌باکس",
    "url": "https://castbox.fm/episode/کتاب-صوتی-کودک-و-نوجوان-id663161061",
    "playable": true
  }
,{"id":"castbox-2538237-980658695","title":"آرنی، دونات شکلاتی","description":"راوی: ملیحه میری","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/آرنی،-دونات-شکلاتی-id2538237-id980658695","playable":true},{"id":"castbox-2538237-975959343","title":"چطور ببر راه راه شد؟","description":"افسانه ویتنامی، راوی: ملیحه میری","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/چطور-ببر-راه-راه-شد؟-id2538237-id975959343","playable":true},{"id":"castbox-2538237-969552517","title":"مدیتیشن سفر به جنگل","description":"تمرین مدیتیشن برای کودکان","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/مدیتیشن-سفر-به-جنگل-id2538237-id969552517","playable":true},{"id":"castbox-2538237-950923486","title":"تو خیلی کوچولویی!","description":"نویسنده: شن رو، راوی: ملیحه میری","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/تو-خیلی-کوچولویی-id2538237-id950923486","playable":true},{"id":"castbox-2538237-904811477","title":"تقریبا هر کاری","description":"از مجموعه قصه های رنگین کمان","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/تقریبا-هر-کاری-id2538237-id904811477","playable":true},{"id":"castbox-2538237-883839982","title":"غاز دیگر","description":"راوی: ملیحه میری","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/غاز-دیگر-id2538237-id883839982","playable":true},{"id":"castbox-2538237-875717968","title":"بیا جشن تولد بگیریم!","description":"نویسنده: فانی جولی","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/بیا-جشن-تولد-بگیریم-id2538237-id875717968","playable":true},{"id":"castbox-2538237-858736690","title":"خداحافظی نرم","description":"نویسنده و راوی: ملیحه میری","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/خداحافظی-نرم-id2538237-id858736690","playable":true},{"id":"castbox-2538237-837303126","title":"از این چرا به اون چرا","description":"نویسنده: تیم نشر کتابِ چرا","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/از-این-چرا-به-اون-چرا-id2538237-id837303126","playable":true},{"id":"castbox-2538237-827087926","title":"روزی که بابا عضو تیم فوتبال شد","description":"نویسنده: موریس فرگو","channel":"همراه مادر و کودک","channelId":"2538237","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کانال-همراهِ-مادر-و-کودک---قصه-و-لالایی-id2538237/episode/روزی-که-بابا-عضو-تیم-فوتبال-شد-id2538237-id827087926","playable":true},{"id":"castbox-4801837-982296852","title":"کلاه مهربانی (قسمت آخر)","description":"داستانی از کتاب قصههایی برای خواب کودکان، نویسنده: فردوس وزیری","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/کلاه-مهربانی-قسمت-آخر-id4801837-id982296852","playable":true},{"id":"castbox-4801837-981439217","title":"کلاه مهربانی (قسمت اول)","description":"داستانی از کتاب قصههایی برای خواب کودکان","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/کلاه-مهربانی-قسمت-اول-id4801837-id981439217","playable":true},{"id":"castbox-4801837-980561923","title":"کی لباس ها را روی زمین ریخته","description":"از کتاب شب بخیر کوچولو، نویسنده: مریم کشاورزی آزاد","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/کی-لباس-ها-را-روی-زمین-ریخته-id4801837-id980561923","playable":true},{"id":"castbox-4801837-980132568","title":"بچه های بی پناه (قسمت آخر)","description":"قصه های شب جلد ۴، برادران گریم","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/بچه-های-بی-پناه-قسمت-آخر-id4801837-id980132568","playable":true},{"id":"castbox-4801837-979540965","title":"بچه های بی پناه (قسمت دوم)","description":"قصه های شب جلد ۴","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/بچه-های-بی-پناه-قسمت-دوم-id4801837-id979540965","playable":true},{"id":"castbox-4801837-979001528","title":"بچه های بی پناه","description":"برادران گریم","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/بچه-های-بی-پناه-id4801837-id979001528","playable":true},{"id":"castbox-4801837-977920840","title":"سفر بند انگشتی (قسمت آخر)","description":"قصه های شب جلد ۴","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/سفر-بند-انگشتی-قسمت-آخر-id4801837-id977920840","playable":true},{"id":"castbox-4801837-977401806","title":"سفر بند انگشتی (قسمت دوم)","description":"قصه های شب جلد ۴","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/سفر-بند-انگشتی-قسمت-دوم-id4801837-id977401806","playable":true},{"id":"castbox-4801837-976871503","title":"بندانگشتی (قسمت اول)","description":"قصه های شب جلد ۴","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/بندانگشتی-قسمت-اول-id4801837-id976871503","playable":true},{"id":"castbox-4801837-976685929","title":"سکه هایی از ستاره","description":"برادران گریم","channel":"داستان شب کودک","channelId":"4801837","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/داستان-شب-کودک-id4801837/episode/سکه-هایی-از-ستاره-id4801837-id976685929","playable":true},{"id":"castbox-4804029-auto1","title":"رامونا نویسنده: برنیس رابرتز","description":"داستان دختر بچه ای پرانرژی و بامزه","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/رامونا-نویسنده-برنیس-رابرتز-id4804029-idauto1","playable":true},{"id":"castbox-4804029-auto2","title":"جودی گرین گیبلز","description":"داستان آنت دویل","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/جودی-گرین-گیبلز-id4804029-idauto2","playable":true},{"id":"castbox-4804029-auto3","title":"۴۸ داستان","description":"مجموعه داستان های کلاسیک","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/۴۸-داستان-id4804029-idauto3","playable":true},{"id":"castbox-4804029-auto4","title":"مانولیتو","description":"داستان کودکانه اسپانیایی","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/مانولیتو-id4804029-idauto4","playable":true},{"id":"castbox-4804029-auto5","title":"رولد دال - کاکائو","description":"داستان عجب شکلات خوری","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/رولد-دال---کاکائو-id4804029-idauto5","playable":true},{"id":"castbox-4804029-auto6","title":"ژول ورن - سفر به مرکز زمین","description":"ماجراهای علمی تخیلی","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/ژول-ورن---سفر-به-مرکز-زمین-id4804029-idauto6","playable":true},{"id":"castbox-4804029-auto7","title":"پی پی جوراب بلند","description":"استر لینگدن","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/پی-پی-جوراب-بلند-id4804029-idauto7","playable":true},{"id":"castbox-4804029-auto8","title":"اریش کستنر - پنج برادر","description":"داستان پنج برادر","channel":"کتاب گویا","channelId":"4804029","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-کتاب-گویا---داستان-برای-بچه-ها-id4804029/episode/اریش-کستنر---پنج-برادر-id4804029-idauto8","playable":true},{"id":"castbox-5065616-889813106","title":"ویژگیهای والدین در دو سبک والدگری","description":"بی تفاوت و قاطع","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/ویژگیهای-والدین-در-دو-سبک-والدگری-id5065616-id889813106","playable":true},{"id":"castbox-5065616-887094842","title":"ویژگیهای والدین مستبد و آسان گیر","description":"سبکهای فرزندپروری","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/ویژگیهای-والدین-مستبد-و-آسان-گیر-id5065616-id887094842","playable":true},{"id":"castbox-5065616-856858869","title":"معرفی کتاب نه تنبیه و نه تشویق","description":"کتاب آموزشی والدگری","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/معرفی-کتاب-نه-تنبیه-و-نه-تشویق-id5065616-id856858869","playable":true},{"id":"castbox-5065616-817481628","title":"پنج نکته فرزندپروری سری سوم","description":"وقتی والد می شویم چه چیزهایی تغییر می کند؟","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/پنج-نکته-فرزندپروری-سری-سوم-id5065616-id817481628","playable":true},{"id":"castbox-5065616-811425402","title":"پنج نکته فرزندپروری سری دوم","description":"درباره غذا خوردن کودک","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/پنج-نکته-فرزندپروری-سری-دوم-id5065616-id811425402","playable":true},{"id":"castbox-5065616-807644283","title":"معرفی کتاب رمز و راز پدری کردن","description":"کتاب فرزندپروری","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/معرفی-کتاب-رمز-و-راز-پدری-کردن-id5065616-id807644283","playable":true},{"id":"castbox-5065616-806338866","title":"پنج نکته فرزندپروری سری اول","description":"مبانی فرزندپروری","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/پنج-نکته-فرزندپروری-سری-اول-id5065616-id806338866","playable":true},{"id":"castbox-5065616-804623172","title":"معرفی کتاب کودک کامل مغز","description":"توسعه مغز کودک","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/معرفی-کتاب-کودک-کامل-مغز-id5065616-id804623172","playable":true},{"id":"castbox-5065616-729685486","title":"طرحواره ناسالم تنبیه","description":"چگونه در کودک شکل می گیرد؟","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/طرحواره-ناسالم-تنبیه-id5065616-id729685486","playable":true},{"id":"castbox-5065616-726954390","title":"طرحواره معیارهای سختگیرانه","description":"عیب جویی افراطی در کودک","channel":"رادیو والدگری","channelId":"5065616","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-والدگری-–-راهبری-آگاهانه-والد-و-کودک-id5065616/episode/طرحواره-معیارهای-سختگیرانه-id5065616-id726954390","playable":true},{"id":"castbox-2451868-831743964","title":"عمو نوروز","description":"نویسنده: راضیه احمدی، راوی: خاله سمینا","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/عمو-نوروز-id2451868-id831743964","playable":true},{"id":"castbox-2451868-901012075","title":"دکتر ترس نداره","description":"نویسنده: فاطمه علیباز","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/دکتر-ترس-نداره-id2451868-id901012075","playable":true},{"id":"castbox-2451868-901011749","title":"اسبی ترسو","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/اسبی-ترسو-id2451868-id901011749","playable":true},{"id":"castbox-2451868-901011643","title":"موشی بی اشتها","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/موشی-بی-اشتها-id2451868-id901011643","playable":true},{"id":"castbox-2451868-901010804","title":"فیلی بد ریخت","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/فیلی-بد-ریخت-id2451868-id901010804","playable":true},{"id":"castbox-2451868-901010571","title":"جغدی وسواس","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/جغدی-وسواس-id2451868-id901010571","playable":true},{"id":"castbox-2451868-901009964","title":"راسو صندوقدار","description":"آشنایی با مشاغل","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/راسو-صندوقدار-id2451868-id901009964","playable":true},{"id":"castbox-2451868-901009563","title":"من و دروازه قرآن","description":"ایرانگردی، داستانهای امیرمحمد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/من-و-دروازه-قرآن-id2451868-id901009563","playable":true},{"id":"castbox-2451868-901008706","title":"خانه آجری","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/خانه-آجری-id2451868-id901008706","playable":true},{"id":"castbox-2451868-880045321","title":"مارمولک دروغگو","description":"نویسنده: نوشین فرزین فرد","channel":"رادیو قصه کودک","channelId":"2451868","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-کودک-|-قصه-شب-کودک-|-خاله-سمینا-id2451868/episode/مارمولک-دروغگو-id2451868-id880045321","playable":true},{"id":"castbox-3780344-auto1","title":"تمرکز و آگاهی لحظه اکنون","description":"تکنیکهای اولیه تمرکز برای کودکان","channel":"دارما کودک","channelId":"3780344","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/دارما-کودک-و-نوجوان-|-Dharma-Kids-id3780344/episode/تمرکز-و-آگاهی-لحظه-اکنون-id3780344-idauto1","playable":true},{"id":"castbox-3780344-auto2","title":"آرامش با دارما","description":"تکنیکهای آرامسازی برای کودکان","channel":"دارما کودک","channelId":"3780344","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/دارما-کودک-و-نوجوان-|-Dharma-Kids-id3780344/episode/آرامش-با-دارما-id3780344-idauto2","playable":true},{"id":"castbox-4717891-auto1","title":"قصه های آرامشبخش شب","description":"مجموعه داستانهای فارسی برای خواب","channel":"قصه های شبانه","channelId":"4717891","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/🎧-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id4717891/episode/قصه-های-آرامشبخش-شب-id4717891-idauto1","playable":true},{"id":"castbox-4717891-auto2","title":"لالایی های کودکانه","description":"مجموعه لالاییهای سنتی","channel":"قصه های شبانه","channelId":"4717891","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/🎧-داستان-صوتی-کودکانه-و-قصه‌های-شبانه-آرامشبخش|قصه‌های-فارسی-برای-خواب-کودک-id4717891/episode/لالایی-های-کودکانه-id4717891-idauto2","playable":true},{"id":"castbox-3375591-959794030","title":"سوسو - داستان جیرجیرک","description":"نویسنده: طاهره اردکانی","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/سوسو---داستان-جیرجیرک-id3375591-id959794030","playable":true},{"id":"castbox-3375591-958754971","title":"چانگو - داستان خرچنگ","description":"داستان حیوانات","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/چانگو---داستان-خرچنگ-id3375591-id958754971","playable":true},{"id":"castbox-3375591-827279634","title":"پولیشا - داستان عروس دریایی","description":"داستان دریا","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/پولیشا---داستان-عروس-دریایی-id3375591-id827279634","playable":true},{"id":"castbox-3375591-810811861","title":"کوروک - داستان تمساح","description":"حیوانات","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/کوروک---داستان-تمساح-id3375591-id810811861","playable":true},{"id":"castbox-3375591-810806966","title":"تُرنادو - داستان عقاب","description":"پرندگان","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/تُرنادو---داستان-عقاب-id3375591-id810806966","playable":true},{"id":"castbox-3375591-810801642","title":"پَنگی - داستان پنگوئن","description":"حیوانات قطبی","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/پَنگی---داستان-پنگوئن-id3375591-id810801642","playable":true},{"id":"castbox-3375591-806340578","title":"وسپا - داستان زنبور سرخ","description":"حشرات","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/وسپا---داستان-زنبور-سرخ-id3375591-id806340578","playable":true},{"id":"castbox-3375591-806339833","title":"پَپَخو - داستان تنبل","description":"حیوانات","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/پَپَخو---داستان-تنبل-id3375591-id806339833","playable":true},{"id":"castbox-3375591-806338725","title":"طوطی و موطی","description":"داستان طوطی","channel":"تاتابخوانی","channelId":"3375591","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/Tatabkhani---قصه-داستان-شب-کودک-کودکانه---تاتابخوانی-id3375591/episode/طوطی-و-موطی-id3375591-id806338725","playable":true},{"id":"castbox-4946220-977553615","title":"پپا - کریسمس با کایلی کانگورو","description":"تنظیم و راوی: آزاده ضابطی","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/پپا---کریسمس-با-کایلی-کانگورو-id4946220-id977553615","playable":true},{"id":"castbox-4946220-975549367","title":"چغلی نکن","description":"نویسنده: جولیا کوک","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/چغلی-نکن-id4946220-id975549367","playable":true},{"id":"castbox-4946220-975152107","title":"پپا و جورج در جستجوی گنج","description":"آزاده ضابطی","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/پپا-و-جورج-در-جستجوی-گنج-id4946220-id975152107","playable":true},{"id":"castbox-4946220-965903023","title":"داستان اسباب بازی ها - پیک نیک","description":"آزاده ضابطی","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/داستان-اسباب-بازی-ها---پیک-نیک-id4946220-id965903023","playable":true},{"id":"castbox-4946220-963895524","title":"سگ های نگهبان - نجات رابل","description":"گروه سنی الف و ب","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/سگ-های-نگهبان---نجات-رابل-id4946220-id963895524","playable":true},{"id":"castbox-4946220-961414129","title":"قصه های مجید - دعوا","description":"نویسنده: هوشنگ مرادی کرمانی","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/قصه-های-مجید---دعوا-id4946220-id961414129","playable":true},{"id":"castbox-4946220-961041588","title":"پپا - یک روز با دکتر همستر","description":"گروه سنی الف و ب","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/پپا---یک-روز-با-دکتر-همستر-id4946220-id961041588","playable":true},{"id":"castbox-4946220-958379920","title":"کله نوشابه ای لجش می گیرد","description":"نویسنده: جولیا کوک","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/کله-نوشابه-ای-لجش-می-گیرد-id4946220-id958379920","playable":true},{"id":"castbox-4946220-953399578","title":"داگلی بغلی","description":"نویسنده: دیوید ملینگ","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/داگلی-بغلی-id4946220-id953399578","playable":true},{"id":"castbox-4946220-952218154","title":"یک روز بارانی","description":"نویسنده: اورال، فریدون","channel":"شب بخیر کوچولو","channelId":"4946220","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/شب-بخیر-کوچولو-با-آزاده-ضابطی-id4946220/episode/یک-روز-بارانی-id4946220-id952218154","playable":true},{"id":"castbox-1554300-961334553","title":"زورو 48 داستان (قدیمی و نوستالژیک)","description":"داستان صوتی کلاسیک","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/زورو-48-داستان-قدیمی-و-نوستالژیک-id1554300-id961334553","playable":true},{"id":"castbox-1554300-377035564","title":"شغال رنگین از مثنوی","description":"راوی: عاطفه پاکنژاد","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/شغال-رنگین-از-مثنوی-id1554300-id377035564","playable":true},{"id":"castbox-1554300-377035563","title":"لانه جدید سنجاب کوچولو","description":"داستان صوتی","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/لانه-جدید-سنجاب-کوچولو-id1554300-id377035563","playable":true},{"id":"castbox-1554300-366768397","title":"آهنگ کودکانه عید نوروز","description":"هنگامه یاشار","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/آهنگ-کودکانه-عید-نوروز-id1554300-id366768397","playable":true},{"id":"castbox-1554300-351400225","title":"مامان جونم تو خیلی مهربونی","description":"ترانه کودکانه","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/مامان-جونم-تو-خیلی-مهربونی-id1554300-id351400225","playable":true},{"id":"castbox-1554300-349530417","title":"مرغ تخم طلا","description":"راوی: فاطمه عرب","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/مرغ-تخم-طلا-id1554300-id349530417","playable":true},{"id":"castbox-1554300-346785204","title":"جوجه کوچولو","description":"راوی: سمیرا کاظمی","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/جوجه-کوچولو-id1554300-id346785204","playable":true},{"id":"castbox-1554300-346458226","title":"شیر عصبانی و خرگوش باهوش","description":"پیروزی عقل و خرد","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/شیر-عصبانی-و-خرگوش-باهوش-id1554300-id346458226","playable":true},{"id":"castbox-1554300-344523538","title":"چشمه سحر آمیز","description":"داستان اعتماد","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/چشمه-سحر-آمیز-id1554300-id344523538","playable":true},{"id":"castbox-1554300-340169636","title":"شازده شیرپلو","description":"درباره بدغذایی کودکان","channel":"ایستگاه کودک","channelId":"1554300","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/ایستگاه-کودک-id1554300/episode/شازده-شیرپلو-id1554300-id340169636","playable":true},{"id":"castbox-2267677-auto1","title":"قصه های صوتی کودکانه","description":"مجموعه داستانهای صوتی","channel":"رادیو قصه صوتی","channelId":"2267677","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-قصه-صوتی-کودکانه-id2267677/episode/قصه-های-صوتی-کودکانه-id2267677-idauto1","playable":true},{"id":"castbox-6037394-976728806","title":"جودی - جلد 6 قسمت 5","description":"داستان شازده کوچولو","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---جلد-6-قسمت-5-id6037394-id976728806","playable":true},{"id":"castbox-6037394-961676030","title":"جودی - هر کار کنی من پایه ام","description":" دوستی و همراهی","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---هر-کار-کنی-من-پایه-ام-id6037394-id961676030","playable":true},{"id":"castbox-6037394-897198186","title":"جودی - 19 دی","description":"حالا هفتم بهمنه و کلی خوشحالم","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---19-دی-id6037394-id897198186","playable":true},{"id":"castbox-6037394-886751455","title":"جودی - تو برام بخند فقط","description":"داستان عشق و دوستی","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---تو-برام-بخند-فقط-id6037394-id886751455","playable":true},{"id":"castbox-6037394-886308490","title":"جودی - من یه دختری رو می شناسم","description":"زندگی با ذوق","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---من-یه-دختری-رو-می-شناسم-id6037394-id886308490","playable":true},{"id":"castbox-6037394-881723857","title":"بازی توییستر","description":"کوشولوی شگفت انگیز","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/بازی-توییستر-id6037394-id881723857","playable":true},{"id":"castbox-6037394-880991417","title":"جودی - تو هر کار کنی من پایه ام","description":"همراهی تا ابد","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---تو-هر-کار-کنی-من-پایه-ام-id6037394-id880991417","playable":true},{"id":"castbox-6037394-879996515","title":"جودی - زندگی داره بدو بدو","description":"افکار و احساسات","channel":"کودک خوب","channelId":"6037394","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کودک-خوب-id6037394/episode/جودی---زندگی-داره-بدو-بدو-id6037394-id879996515","playable":true},{"id":"castbox-5258942-976075097","title":"پایان پادشاه بزرگ - داریوش بزرگ 4","description":"راوی: فاطمه معدنی","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/پایان-پادشاه-بزرگ---داریوش-بزرگ-4-id5258942-id976075097","playable":true},{"id":"castbox-5258942-964545585","title":"دوران طلایی - داریوش بزرگ 3","description":"تاریخ ایران باستان","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/دوران-طلایی---داریوش-بزرگ-3-id5258942-id964545585","playable":true},{"id":"castbox-5258942-956878508","title":"کوه بیستون - داریوش بزرگ 2","description":"نوشته بر داریوش","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/کوه-بیستون---داریوش-بزرگ-2-id5258942-id956878508","playable":true},{"id":"castbox-5258942-904487477","title":"از آشوب تا امپراتوری - داریوش بزرگ 1","description":"تاریخ هخامنشیان","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/از-آشوب-تا-امپراتوری---داریوش-بزرگ-1-id5258942-id904487477","playable":true},{"id":"castbox-5258942-887165691","title":"بردیای دروغین - گئومات","description":"فریب بزرگ هخامنشی","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/بردیای-دروغین---گئومات-id5258942-id887165691","playable":true},{"id":"castbox-5258942-855409051","title":"از فتح تا جنون و مرگ - کمبوجیه دوم","description":"تاریخ ایران باستان","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/از-فتح-تا-جنون-و-مرگ---کمبوجیه-دوم-id5258942-id855409051","playable":true},{"id":"castbox-5258942-853526496","title":"جشن مهر و پیروزی - جشن مهرگان","description":"جشنهای ایرانی","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/جشن-مهر-و-پیروزی---جشن-مهرگان-id5258942-id853526496","playable":true},{"id":"castbox-5258942-851098813","title":"از کوچ تا پادشاهی 2 - مادها","description":"تاریخ ایران","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/از-کوچ-تا-پادشاهی-2---مادها-id5258942-id851098813","playable":true},{"id":"castbox-5258942-849017510","title":"از کوچ تا پادشاهی 1 - مادها","description":"آغاز پادشاهی ماد","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/از-کوچ-تا-پادشاهی-1---مادها-id5258942-id849017510","playable":true},{"id":"castbox-5258942-846300963","title":"تمدن گمشده - جیرفت","description":"باستانشناسی ایران","channel":"هزاردستان","channelId":"5258942","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزاردستان-قصه-های-تاریخی-برای-کودک-و-نوجوان-id5258942/episode/تمدن-گمشده---جیرفت-id5258942-id846300963","playable":true},{"id":"castbox-5558670-880375747","title":"ماجرای معده خودخواه","description":"کتاب صوتی کودک","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/ماجرای-معده-خودخواه-id5558670-id880375747","playable":true},{"id":"castbox-5558670-779263991","title":"دختری که ماه را نوشید بخش 8","description":"کلی بارن هیل","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/دختری-که-ماه-را-نوشید-بخش-8-id5558670-id779263991","playable":true},{"id":"castbox-5558670-774858288","title":"دختری که ماه را نوشید بخش 7","description":"ادامه داستان","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/دختری-که-ماه-را-نوشید-بخش-7-id5558670-id774858288","playable":true},{"id":"castbox-5558670-774244992","title":"دختری که ماه را نوشید بخش 6","description":"ماجراهای لونا","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/دختری-که-ماه-را-نوشید-بخش-6-id5558670-id774244992","playable":true},{"id":"castbox-5558670-769910776","title":"دختری که ماه را نوشید بخش 5","description":"قدرتهای خارقالعاده","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/دختری-که-ماه-را-نوشید-بخش-5-id5558670-id769910776","playable":true},{"id":"castbox-5558670-699171298","title":"آرزوهای کوچک بخش سوم","description":"کارن هس","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/آرزوهای-کوچک-بخش-سوم-id5558670-id699171298","playable":true},{"id":"castbox-5558670-694108251","title":"آرزوهای کوچک بخش دوم","description":"گروه سنی +۹","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/آرزوهای-کوچک-بخش-دوم-id5558670-id694108251","playable":true},{"id":"castbox-5558670-690324966","title":"آرزوهای کوچک بخش اول","description":"داستان مگز","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/آرزوهای-کوچک-بخش-اول-id5558670-id690324966","playable":true},{"id":"castbox-5558670-683685268","title":"هریسون چسبنده","description":"حساب شخصی دیگران","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/هریسون-چسبنده-id5558670-id683685268","playable":true},{"id":"castbox-5558670-679816377","title":"سطل مهربانی","description":"فیلیکس و شادی","channel":"کتاب صوتی کودک","channelId":"5558670","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/کتاب-صوتی-کودک-و-نوجوان-id5558670/episode/سطل-مهربانی-id5558670-id679816377","playable":true},{"id":"castbox-6584239-977302783","title":"چه خوب؛ چه بد","description":"نو نوشته: جوآن لوکس","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/چه-خوب؛-چه-بد-id6584239-id977302783","playable":true},{"id":"castbox-6584239-971698919","title":"لباس جدید امپراطور","description":"هانس کریستین اندرسن","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/لباس-جدید-امپراطور-id6584239-id971698919","playable":true},{"id":"castbox-6584239-965450661","title":"چه کسی قایق را غرق کرد؟","description":"پاملا آلن","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/چه-کسی-قایق-را-غرق-کرد؟-id6584239-id965450661","playable":true},{"id":"castbox-6584239-959332834","title":"دماسنجی که از تغییر نظر می ترسید","description":"هادی میمدال","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/دماسنجی-که-از-تغییر-نظر-می-ترسید-id6584239-id959332834","playable":true},{"id":"castbox-6584239-953333952","title":"قدم یازدهم","description":"سوسن طاقدیس","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/قدم-یازدهم-id6584239-id953333952","playable":true},{"id":"castbox-6584239-948151595","title":"ابیات فارسی بخش ششم","description":"شاهنامه فردوسی","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/ابیات-فارسی-بخش-ششم-id6584239-id948151595","playable":true},{"id":"castbox-6584239-948151291","title":"قرآن بخش سوم","description":"گزیده آیات","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/قرآن-بخش-سوم-id6584239-id948151291","playable":true},{"id":"castbox-6584239-907611178","title":"آنکه خیال بافت و آنکه عمل کرد","description":"نادر ابراهیمی","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/آنکه-خیال-بافت-و-آنکه-عمل-کرد-id6584239-id907611178","playable":true},{"id":"castbox-6584239-905163770","title":"پروین اعتصامی - مرد فقیر","description":"مژگان شیخی","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/پروین-اعتصامی---مرد-فقیر-id6584239-id905163770","playable":true},{"id":"castbox-6584239-905162185","title":"جینی، قورباغه خوبی باش","description":"ویلما کاستتی","channel":"رادیو کودک | قصه های من و بابام","channelId":"6584239","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/رادیو-کودک-|-قصههای-من-و-بابام-id6584239/episode/جینی،-قورباغه-خوبی-باش-id6584239-id905162185","playable":true},{"id":"castbox-7274752-auto1","title":"کودک، خانواده، انسان - بخش 1","description":"ادل فیبر و آیلین مزلیش","channel":"روایت رشد","channelId":"7274752","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/روایت-رشد🌱-|کودک،-خانواده،-انسان|-id7274752/episode/کودک،-خانواده،-انسان---بخش-1-id7274752-idauto1","playable":true},{"id":"castbox-7274752-auto2","title":"کودک، خانواده، انسان - بخش 2","description":"مهارتهای ارتباطی با کودکان","channel":"روایت رشد","channelId":"7274752","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/روایت-رشد🌱-|کودک،-خانواده،-انسان|-id7274752/episode/کودک،-خانواده،-انسان---بخش-2-id7274752-idauto2","playable":true},{"id":"castbox-5233647-722836442","title":"چه هوایی را دوست داری؟","description":"داستان کوتاه","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/چه-هوایی-را-دوست-داری؟-id5233647-id722836442","playable":true},{"id":"castbox-5233647-674834016","title":"شام سرد شد کوتی کوتی","description":"کتاب اول بخش سوم","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/شام-سرد-شد-کوتی-کوتی-id5233647-id674834016","playable":true},{"id":"castbox-5233647-674833901","title":"قصه های کوتی کوتی بخش دوم","description":"داستانهای طنز","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/قصه-های-کوتی-کوتی-بخش-دوم-id5233647-id674833901","playable":true},{"id":"castbox-5233647-673936838","title":"شام سرد شد","description":"کوتی کوتی","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/شام-سرد-شد-id5233647-id673936838","playable":true},{"id":"castbox-5233647-665584611","title":"آن مان گاوای ابری نباران","description":"دو ابر گاوی شکل","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/آن-مان-گاوای-ابری-نباران-id5233647-id665584611","playable":true},{"id":"castbox-5233647-664276531","title":"ریزه","description":"تابآوری کودکان","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/ریزه-id5233647-id664276531","playable":true},{"id":"castbox-5233647-663096444","title":"سنجاب کوچولو دیگر ناراحت نیست","description":"پرواز و امید","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/سنجاب-کوچولو-دیگر-ناراحت-نیست-id5233647-id663096444","playable":true},{"id":"castbox-5233647-659690945","title":"به دنبال وقت","description":"داستان کوتاه","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/به-دنبال-وقت-id5233647-id659690945","playable":true},{"id":"castbox-5233647-656258352","title":"سگی که قار قار می کرد","description":"داستان طنز","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/سگی-که-قار-قار-می-کرد-id5233647-id656258352","playable":true},{"id":"castbox-5233647-654791414","title":"دریاچه رو کی دزدیده!","description":"معمای دریاچه","channel":"قصه های مادر و کودک","channelId":"5233647","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-های-مادر-و-کودک-id5233647/episode/دریاچه-رو-کی-دزدیده-id5233647-id654791414","playable":true},{"id":"castbox-3837542-auto1","title":"قصه کودک - داستان شب","description":"داستانهای صوتی کودکانه","channel":"قصه کودک","channelId":"3837542","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/قصه-کودک-id3837542/episode/قصه-کودک---داستان-شب-id3837542-idauto1","playable":true},{"id":"castbox-4097903-975855153","title":"پایان کتاب کلیدهای رفتار با کودک سه ساله","description":"شهزاد معایر حقیقی","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/پایان-کتاب-کلیدهای-رفتار-با-کودک-سه-ساله-id4097903-id975855153","playable":true},{"id":"castbox-4097903-975854418","title":"فصل 33 - تفاوت های ظاهری افراد","description":"کتاب کلیدهای رفتار","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-33---تفاوت-های-ظاهری-افراد-id4097903-id975854418","playable":true},{"id":"castbox-4097903-974607781","title":"فصل 32 - اسباب کشی","description":"اتاق جدید و اقامت موقت","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-32---اسباب-کشی-id4097903-id974607781","playable":true},{"id":"castbox-4097903-974607700","title":"فصل 31 - مسافرت","description":"ایمنی در مسافرت","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-31---مسافرت-id4097903-id974607700","playable":true},{"id":"castbox-4097903-973305542","title":"فصل 30 - جشن تولد","description":"جشن گرفتن یا نگرفتن","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-30---جشن-تولد-id4097903-id973305542","playable":true},{"id":"castbox-4097903-973298263","title":"فصل 29 - مهدکودک","description":"کلاس و برنامه تحصیلی","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-29---مهدکودک-id4097903-id973298263","playable":true},{"id":"castbox-4097903-972866192","title":"فصل 28 - ایمنی","description":"ایمنی در خانه و بیرون","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-28---ایمنی-id4097903-id972866192","playable":true},{"id":"castbox-4097903-667996141","title":"فصل 27 - اتاق کودک","description":"فضای کودک محور","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-27---اتاق-کودک-id4097903-id667996141","playable":true},{"id":"castbox-4097903-545780063","title":"فصل 26 - پرورش کودک استثنایی","description":"کودک با استعداد","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-26---پرورش-کودک-استثنایی-id4097903-id545780063","playable":true},{"id":"castbox-4097903-529975348","title":"فصل 25 - پرورش کودک لوس","description":"نحوه برخورد با رفتار لوس","channel":"هزار و یک برگ - شهرزاد","channelId":"4097903","type":"audio","category":"قصه","audience":"کودک","age":"۳-۱۲ سال","source":"کست‌باکس","url":"https://castbox.fm/channel/هزار-و-یک-برگ-؛-شهرزاد-id4097903/episode/فصل-25---پرورش-کودک-لوس-id4097903-id529975348","playable":true}];
