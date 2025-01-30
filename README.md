# پروژه اولیه

پروژه اولیه را از
%problem.initial_project%
دانلود کنید.
ساختار فایل‌های این پروژه به صورت زیر است.

<details class="green">
<summary>
ساختار فایل‌های این پروژه به این صورت است
</summary>

```
useFilter
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   ├── css
│   │   │   └── index.css
│   │   └── font
│   │       └── Vazir.ttf
│   ├── components
│   │   ├── chips
│   │   │   ├── chips.css
│   │   │   └── index.jsx
│   │   ├── formInput
│   │   │   ├── Checkbox
│   │   │   │   ├── Checkbox.css
│   │   │   │   └── index.jsx
│   │   │   ├── CheckboxGroup
│   │   │   │   ├── CheckboxGroup.css
│   │   │   │   └── index.jsx
│   │   │   ├── Dropdown
│   │   │   │   └── index.jsx
│   │   │   ├── RangeInput
│   │   │   │   ├── RangeInput.css
│   │   │   │   └── index.jsx
│   │   │   ├── TextInput
│   │   │   │   └── index.jsx
│   │   │   ├── Textarea
│   │   │   │   └── index.jsx
│   │   │   ├── FilterForm.jsx
│   │   │   ├── FormClear.jsx
│   │   │   └── FormItem.jsx
│   │   └── Location.jsx
│   ├── constants
│   │   └── FormType.js
│   ├── data
│   │   └── formData.js
│   ├── hooks
│   │   └── useFilter.js
│   ├── App.jsx
│   └── index.jsx
└── package.json
```
</details>

<details class="brown">
<summary>
راه‌اندازی پروژه
</summary>
برای اجرای پروژه، باید`NodeJS` و `npm` را از قبل نصب کرده باشید.

- ابتدا پروژه‌ی اولیه را دانلود و از حالت فشرده خارج کنید.
- در پوشه‌ی `useFilter` ، دستور `npm install` را برای نصب نیازمندی‌ها اجرا کنید.
- در همین پوشه، دستور `npm start` را برای راه‌اندازی پروژه اجرا کنید.

</details>


# جزئیات



خیلی مواقع، وقتی که ما داریم با کامپوننت جدول کار میکنیم که از قضا این جدول یه فیلتر هم داره،  
پیش میاد که بخوایم فیلتری که روی جدول اعمال کردیم رو با بقیه به اشتراک بذاریم .
برای این کار ما تصمیم گرفتیم یه هوک بنویسیم که کارش اینه که 
state
فیلتر رو روی آدرس اعمال کنه. اینجوری ما خیلی راحت میتونیم این آدرس رو به دیگران بدیم و اونا هم فیلترهایی
که ما اعمال کردیم رو ببینن. بنابراین ما تصمیم داریم یک هوک بسازیم که این کار رو برای ما راحت می‌کنه. 

     وظیفه شما این است
     که در کامل کردن هوک 
     *useFilter*
     به ما کمک کنید.
     داده لازم برای ساخت فرم به صورت یک آرایه به هوک
   *`useFilter.js`*
      پاس داده میشود که هر عضو این آرایه معادل یک المان 
      (*input element*)
      از فرم می باشد. آبجکت زیر شامل تمامی 
      *`props`*
      است که به المان‌ها داده می شود. بعضی از این 
     *`props`*
      مربوط به نوع خاصی از المان‌ها هستند.به طور مثال 
*`options`*
فقط مربوط به 
`dropdown` و `checkbox group` 
است.


```json
{
  "type": "text"|"number"|"dropdown"|"textarea"|"checkbox"|"checkbox-group",
  "name": string,
  "label": string,
  "children"?: string[],
  "parent"?: string,
  "options": [{ value: string|number, title: string|number }],
  "groupedOptions"?: {[string|number]:string[]},
}
```

### فیلد options
همانطور که گفته شد این فیلد مختص 
`dropdown` و `checkbox group` 
می‌باشد.
### فیلد *parent* و *children*
بعضی از المان های فرم ممکن است دارای وابستگی به المان دیگری باشند. 
این وابستگی در فرزند با فیلدی به نام 
*parent*
که یک رشته شامل نام پدر است، نمایش داده می شود و در المان پدر با فیلدی به نام 
*children*
 که شامل آرایه ای از رشته ها شامل نام
 (*name* فیلد)
  فرزندان می باشد. 

  binding دو طرفه آدرس و فرم
هوک خواسته شده بایستی که یک اتصال
(*binding*)
دو طرفه بین آدرس
(url) 
و فیلدهای فرم داشته باشد. این هوک بایستی یک آبجکت شامل کلیدهای زیر برگرداند:

```json
{
  "filterState": {
    "name": value
  }
  "setFilterState": (filterState)=>void
  "onChange": (e, name, type)=>void
  "onClear": (name)=>void
  "onClearAll": ()=>void
}
```

### filterState
یک آبجکت شامل state
فرم است که هر کلید آن یک name
المان می‌باشد
### setFilterState
عملکردی معادل setter
در هوک 
useState دارد

### onChange
این تابع هنگام تغییر هر المان فرم صدا زده می‌شود.

### onClear
در پایین صفحه دکمه هایی برای پاک کردن مقادیر المان‌های فرم‌ وجود دارد، با کلیک کردن بر روی این دکمه‌ها بایستی 
مقدار المان مورد نظر از فرم پاک شود و همزمان این مقدار از آدرس هم پاک شود. این تابع به عنوان ورودی 
name 
المان مورد نظر را دریافت میکند که از روی آن میتوانید عملیات مورد نظر را انجام دهید.
### نکته:
 در صورتی که مقدار المان پدر تغییر کند و یا پاک شود، مقدار المان فرزند حتما باید ریست شود، بدین معنی
که هم از آدرس پاک شود و هم مقدار 
*input*
مربوطه خالی شود.

### onClearAll
در صورتی که روی دکمه پاک کردن همه کلیک شود، مسلما بایستی تمامی مقادیر المان‌ها پاک شود و آدرس به حالت 
`/`
خالی برود

### تجزیه و ترکیب آدرس (url parser & url stringify)
 همانطور که میدونید در حالت کلی پارامترهای جستجوی آدرس
  (*query parameter*) 
  به صورت زیر ساخته می شود:
  ?name1=value1&name2=value2&name3=v1,v2,v3
  اما نکته ای که وجود دارد، ما به دلایلی نیاز داریم از فرمت
   متفاوتی برای ساخت این آدرس استفاده کنیم بصورتی که برای پشت سر هم قرار دادن پارامترها به جای کارکتر
  `&` 
  از 
  `+`
  و به جای کارکتر
`=`
 از 
 `~`
استفاده میکنیم. همچنین در مواردی که یک آرایه از مقادیر داریم به جای 
`,` 
از کارکتر 
`--`
استفاده میکنیم, به طور مثال این پارامترهای رایج آدرس: 
 *?name1=value1&name2=v1,v2,v3* 
به این صورت تبدیل می شوند
 `*?name1~value1+name2~v1--v2--v3*`.
 
 به طور مثال پارامترهای آدرس بالا به صورت زیر تجزیه
 *parse*
  می‌شود:

 ```json
 {
   "name1": "value1",
   "name2":["v1","v2","v3"]
 }
 ```

 #### نکته
 اگر المان مورد نظر از نوع 
 checkbox-group
 باشد مقدار این المان در آدرس باید به صورت آرایه می باشد که در آدرس این مقدار باید به صورت زیر نشان داده شود
 `?name~v1--v2--v3`



### مواردی که باید در این سوال رعایت کنید:
- شما باید هوک خواسته شده را به صورتی کامل کنید که یک 
*binding*
دو طرفه بین پارامترهای آدرس و مقادیر فیلدهای فرم باشد. 
json
آرایه ای که فرم از روی آن ساخته می‌شود 
(*`formData`*)
به عنوان ورودی 
به هوک داده می‌شود.

-  فیلدی که مقداری ندارد نباید در پارامترهای جستجو 
(*query params*)
 آدرس ظاهر شود

-  در ساختن پارامترهای آدرس باید از کارکتر 
 `~`
 برای جدا کردن 
 *key*,*value*
   و از کارکتر
    `+`
  برای جدا کردن پارامترهای مختلف از همدیگر استفاده کنید.
   همچنین اگر مقدار المان به صورت یک آرایه بود که این اتفاق فقط در المان
  *`checkbox group`*
   اتفاق می‌افند، بایستی مقدار این المان به صورت یک رشته جدا شده با 
   `--`
  (ترتیب مهم نیست) در بیاید

- در صورتی که روی دکمه های پاک کردن 
(*clear*) 
پایین صفحه زده شود بایستی پارامتر مورد نظر از آدرس مربوطه پاک شود
و همزمان مقدار 
*input*
 متصل به آن فیلد ریست شود.

- در صورتی که یک فیلد دارای 
*children*
است در صورت پاک شدن این فیلد بایستی تمامی فرزندانش نیز از آدرس پاک شوند و 
مقدار 
*input* 
مورد نظر هم ریست شود

- فیلدهای فیلتر بایستی مقداردهی اولیه شوند
به طوری که در زمان بارگذاری صفحه، در صورتی که آدرس دارای پارامترهای جستجو
(*query params*)
 باشد، باید بلافاصله این مقادیر با
 فرم هماهنگ شوند و فیلدهای فرم با مقادیر آدرس پر شوند.
 

## کتابخانه مورد استفاده 
- react-router-dom




## تغییرات لازم برای هر فایل:
- شما تنها مجاز به اعمال تغییرات در فایل  `hooks/useFilter.js`  هستید.
- تنها مجاز به استفاده از گتابخانه های ذکر شده در صورت سوال هستید.



