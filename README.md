# IF3260_Tugas3_K02_G17

## Deskripsi

Pada tugas 2 kali ini, dibuat sebuah website menggunakan WebGL Murni, tanpa library/framework. Website ini dapat menerima inputan articulated model 3D dan menampilkannya. Pada website ini, terdapat beberapa controller untuk memodifikasi objek maupun tampilan objek, seperti mengubah proyeksi, translasi, rotasi, scaling, shading, dan pengubahan kamera.
Website ini menyediakan beberapa fitur, yaitu:
1. Load object
Fitur ini digunakan untuk mengimport suatu object 3D pada canvas.
Konfigurasi dari file adalah JSON file yang berisikan ‘model_name’, ‘root_name’, ‘rotation’, translation’, ‘scaling’, dan ‘parts’. Lalu, ‘parts’ terdiri dari array yang berisi bagian-bagian dari articulated model. Setiap bagian ini memiliki struktur ‘name’, ‘vertices’, children’, ‘siblings’, ‘rotation’, ‘translation’, ‘rotate_coord’, dan ‘animation’. Terdapat 4 articulated model yang kami jadikan contoh yang dapat ditemukan pada folder `test`, yaitu:
- Iron Golem (Suryanto 13520059)
- Blaze dari Minecraft(Ghebyon Tohada Nainggolan 13520059 )
- Sheep (Monica Adelia 13520096)
- Hand (Roy Roy H Simbolon 13519068)

2. Shading
Terdapat tombol on/off untuk mengaktifkan atau mematikan fitur shading.
3. Projection
Mengubah proyeksi dari view suatu objek. Proyeksi yang terdapat pada website ini adalah orthographic, oblique, dan perspective. Dilakukan perubahan posisi awal kamera agar perbedaan proyeksi dapat terlihat.
4. Translation
Fitur ini dapat melakukan translasi pada objek 3D. Terdapat slider untuk melakukan translasi sumbu x, y, dan z.
5. Rotation
Fitur ini dapat melakukan rotasi pada objek 3D. Terdapat slider untuk melakukan sumbu x, y, dan z.
6. Scaling
Fitur ini dapat melakukan scaling pada objek 3D. Terdapat slider untuk melakukan scaling sumbu x, y, dan z
7. Camera
Fitur ini digunakan untuk mengubah posisi dari camera. Terdapat slider untuk mengubah angle atau radius kamera dengan objek
8. Reset to default view
Fitur ini mengembalikan objek ke tampilan semula
9. Help
Fitur ini menampilkan panduan dalam menggunakan website
10. Save Model
Fitur ini akan menyimpan model yang sedang ada di canvas.
11. Load Model
Fitur ini akan meload model dari file json dan menampilkannya di canvas.
12. Animation (Fitur bonus)
Fitur ini memungkinkan object akan secara otomatis berotasi pada sumbu x.
13. Component Tree (Fitur bonus)
Fitur ini akan menampilkan bagian dari object yang di load. Sehingga controller rotasi dan translasi hanya berjumlah 1.


## Prerequisites

- Browser that support WebGL

## How to run

1. Clone repository
2. Buka file index.html yang terdapat pada folder src menggunakan web browser yang support WebGL (Disarankan menggunakan httpserver / liveserver).

Dapat juga diakses lansung melalui https://if-3260-tugas3-k02-g14.vercel.app/
## Fitur


## Authors

| Nama                      |   NIM    |
| ------------------------- | :------: |
| Ghebyon Tohada Nainggolan | 13520079 |
| Suryanto                  | 13520059 |
| Monica Adelia             | 13520096 |
| Roy H Simbolon            | 13519068 |
