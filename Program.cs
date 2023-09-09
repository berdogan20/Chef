using Chef.Data;
using Chef.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;                           // * To set up swagger and openAPI


var builder = WebApplication.CreateBuilder(args);



// add db context
builder.Services.AddDbContext<Entities>(options =>
options.UseInMemoryDatabase(databaseName: "Books"),
ServiceLifetime.Singleton);




// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen(c =>                             // * To set up swagger and openAPI
{
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "https://localhost:7207"
    });

    // to change swagger operation names
    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]
            + e.ActionDescriptor.RouteValues["controller"]}");
});



// To inject the entities singleton 
// to use entities class over all controllers:
builder.Services.AddSingleton<Entities>();

var app = builder.Build();


// "seeding data"
var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();
Food[] foodsToSeed = new Food[]
{
    new Food(
            Guid.NewGuid(),
            "Denizci",
            "Özel Pizza Sosumuz, mozarella, mısır, taze soğan, domates ve ton balığı ile denize açılma vakti!",
             "https://www.papajohns.com.tr/upload/big/image5e56fb9cd11bc.jpg",
             35, 15),
    new Food(
        Guid.NewGuid(),
        "Vegan",
        "Hayvansal gıda içermeyen (Mozeralla içermeyen) veganlara özel yaptığımız, Taze Domates,Taze Mantar, Soğan,Yeşil Biber,Siyah Zeytin ve Mısır'dan oluşan Vegan Pizzamız.",
        "https://www.papajohns.com.tr/upload/big/image5e56fbf83ea3f.jpg",
        32, 12),
    new Food(
        Guid.NewGuid(),
        "Hesaplı Menü",
        "1 McChicken™ + 1 Orta Patates + 1 Orta Coca-Cola + 8'li Çıtır Soğan Halkaları",
        "https://siparis.mcdonalds.com.tr/Files/Product/Menus/WEB3_1076.jpg",
        25, 10),
    new Food(
        Guid.NewGuid(),
        "Köfte Burgerli Tok Artık Menüsü",
        "4 Adet Köfte Burger + 1 Adet Büyük Boy Patates + 2 Adet Orta Boy İçecek",
        "https://siparis.mcdonalds.com.tr/Files/Product/Menus/WEB3_1005.jpg",
        22, 12),
    new Food(
         Guid.NewGuid(),
         "Sıcak Kahvaltı Tabağı",
         "Haşlanmış yumurta, Reçel, ızgara hellim peyniri, Kızarmış sosis, Domates, Salatalık, Zeytin, Sigara böreği.",
        "https://cdn.yemek.com/mnresize/1250/833/uploads/2021/03/lokma-rumeli-hisari-kahvalti-2022.jpg",
        40, 8),
    new Food(
        Guid.NewGuid(),
        "Pad Thai Tavuk",
        "Pirinç eriştesi, tavuk göğüs, soya filizi, taze soğan, fıstık, yumurta, lime ve pul biber ile",
        "https://www.sushico.com.tr/site/products/big/1682930248_1.jpg",
        20, 6),
    new Food(
        Guid.NewGuid(),
        "Süper Salmon Roll",
        "Somon, krem peynir, salatalık / Kızarmış panko, yuzu mayonez ",
        "https://www.sushico.com.tr/site/products/big/1682930694_1.jpg",
        15, 7),
    new Food(
        Guid.NewGuid(),
        "Pad Thai Karides",
        "Pirinç eriştesi, karides, soya filizi, taze soğan, fıstık, yumurta, lime ve pul biber ile. ",
         "https://www.sushico.com.tr/site/products/big/1682930406_1.jpg",
         20, 10),
    new Food(
        Guid.NewGuid(),
        "Tom Yum",
        "Karides, shitake mantar, çeri domates, limon çubuğu, kırmızı soğan, kişniş,",
        "https://www.sushico.com.tr/site/products/big/1682929149_1.jpg",
        15, 5),
    new Food(
        Guid.NewGuid(),
        "Deniz Mahsüllü Çorba",
        "Hindistan cevizi sütü, levrek, somon, kalamar, kırmızı soğan, havuç, çin acı sosu, kişniş, ",
        "https://www.sushico.com.tr/site/products/big/1667254274_1.jpg",
        24, 8),
    new Food(
        Guid.NewGuid(),
        "Wonton Çorbası",
        "Çin Mantısı (3 Ad), taze soğan, yumurta.",
        "https://www.sushico.com.tr/site/products/big/1303651819_1.jpg",
        15, 5),
    new Food(
        Guid.NewGuid(),
        "Füme Somonlu Asian Salata",
        "Somon füme, soya filizi, havuç, kırmızı soğan, domates, mix yeşillik, fıstık, avokado, mikro filiz, yuzu soya sos ile.",
        "https://www.sushico.com.tr/site/products/big/1682929692_1.jpg",
        20, 4),
    new Food(Guid.NewGuid(),"Asian Salad", "Soya filizi, havuç, kırmızı soğan, domates, mix yeşillik, fıstık, avokado, mikro filiz, yuzu soya sos ile.",
      "https://www.sushico.com.tr/site/products/big/1667257901_1.jpg",
      18, 12)
};
entities.Foods.AddRange(foodsToSeed);

User[] usersToSeed = new User[]
{
    new User("admin@gmail.com", "admin", "Istanbul Sariyer Chef"),
    new User("aysel@gmail.com", "aysel", "Kirsehir Merkez Kayabasi"),
    new User("beyza@gmail.com", "beyza", "Istanbul Sariyer Rumelifeneri"),
    new User("isa@gmail.com", "isa", "Kortulu Koyu"),
    new User("yunus@gmail.com", "yunus", "Istanbul Besiktas")
};
entities.Users.AddRange(usersToSeed);

entities.SaveChanges();


app.UseCors(builder => builder
.WithOrigins("*")
.AllowAnyMethod()
.AllowAnyHeader());


app.UseSwagger().UseSwaggerUI();                                // * To set up swagger and openAPI

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

