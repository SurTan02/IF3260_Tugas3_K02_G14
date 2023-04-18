const jsonObjTes = {
  "model_name" : "testing_obj",
  "root_name" : "body",
  "texture_mode" : 3,
  "parts": [
      {
          "name" : "body",
          "vertices" : [

              -2.3, -1.8, 1.4,
              2.3, -1.8, 1.4,
              2.3, 1, 1.4,
              -2.3, 1, 1.4,

              -2.3, -1.8, -1.4,
              -2.3, 1, -1.4,
              2.3, 1, -1.4,
              2.3, -1.8, -1.4,

              -2.3, 1, -1.4,
              -2.3, 1, 1.4,
              2.3, 1, 1.4,
              2.3, 1, -1.4,

              -2.3, -1.8, -1.4,
              2.3, -1.8, -1.4,
              2.3, -1.8, 1.4,
              -2.3, -1.8, 1.4,

              2.3, -1.8, -1.4,
              2.3, 1, -1.4,
              2.3, 1, 1.4,
              2.3, -1.8, 1.4,

              -2.3, -1.8, -1.4,
              -2.3, -1.8, 1.4,
              -2.3, 1, 1.4,
              -2.3, 1, -1.4
              ],
          "indices" : [
              0, 1, 2, 0, 2, 3,
              4, 5, 6, 4, 6, 7,
              8, 9, 10, 8, 10, 11,
              12, 13, 14, 12, 14, 15,
              16, 17, 18, 16, 18, 19,
              20, 21, 22, 20, 22, 23
          ],"color" : [
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0,
              0, 0, 0
          ],
          "children" : ["head", "left-foot", "left-arm", "right-foot", "right-arm"],
          "siblings" : [],
          "is_shading_on" : false,
          "is_texture_on" : false,
          "rotation" : [0,-30,0],
          "translation" : [0,0,0],
          "rotate_coord" : [0,0,0],
          "animation": [
            [0, -30, 0],
            [0,-45,0],
            [0,-60,0],
            [0,-75,0],
            [0,-90,0],
            [0, -105,0],
            [0,-120,0],
            [0,-135,0],
            [0,-150,0]
          ]
      },
      {
          "name" : "head",
          "vertices" : [

              -3, 1, 0.95,
              -0.8, 1, 0.95,
              -0.8, 3, 0.95,
              -3, 3, 0.95,

              -3, 1, -0.95,
              -3, 3, -0.95,
              -0.8, 3, -0.95,
              -0.8, 1, -0.95,

              -3, 3, -0.95,
              -3, 3, 0.95,
              -0.8, 3, 0.95,
              -0.8, 3, -0.95,

              -3, 1, -0.95,
              -0.8, 1, -0.95,
              -0.8, 1, 0.95,
              -3, 1, 0.95,

              -0.8, 1, -0.95,
              -0.8, 3, -0.95,
              -0.8, 3, 0.95,
              -0.8, 1, 0.95,

              -3, 1, -0.95,
              -3, 1, 0.95,
              -3, 3, 0.95,
              -3, 3, -0.95
              ],
          "indices" : [
              0, 1, 2, 0, 2, 3,
              4, 5, 6, 4, 6, 7,
              8, 9, 10, 8, 10, 11,
              12, 13, 14, 12, 14, 15,
              16, 17, 18, 16, 18, 19,
              20, 21, 22, 20, 22, 23
          ],
          "color" : [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,

            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,

            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,

            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,

            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,

            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1
        ],
          "children" : [],
          "siblings" : [],
          "is_shading_on" : false,
          "is_texture_on" : false,
          "rotation" : [0,0,0],
          "translation" : [0,0,0],
          "rotate_coord" : [-1,1,0],
          "animation": [
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0, 0, 0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ]
      },
      {
          "name" : "left-foot",
          "vertices" : [

            1.05, -3.3, 2.2,
            1.85, -3.3, 2.2,
            1.85,  -0.5, 2.2,
            1.05,  -0.5, 2.2,

            1.05, -3.3, 1.4,
            1.05, -0.5,  1.4,
            1.85, -0.5,  1.4,
            1.85, -3.3, 1.4,

            1.05, -0.5, 1.4,
            1.05, -0.5, 2.2,
            1.85, -0.5, 2.2,
            1.85, -0.5, 1.4,

            1.05, -3.3, 1.4,
            1.85, -3.3, 1.4,
            1.85, -3.3, 2.2,
            1.05, -3.3, 2.2,

            1.85, -3.3, 1.4,
            1.85, -0.5, 1.4,
            1.85, -0.5, 2.2,
            1.85, -3.3, 2.2,

            1.05, -3.3, 1.4,
            1.05, -3.3, 2.2,
            1.05, -0.5, 2.2,
            1.05, -0.5, 1.4
            ],
          "indices" : [
              0, 1, 2, 0, 2, 3,
              4, 5, 6, 4, 6, 7,
              8, 9, 10, 8, 10, 11,
              12, 13, 14, 12, 14, 15,
              16, 17, 18, 16, 18, 19,
              20, 21, 22, 20, 22, 23
          ],
          "color" : [
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1,
              1, 1, 1
        ],
          "children" : [],
          "siblings" : [],
          "is_shading_on" : false,
          "is_texture_on" : false,
          "rotation" : [0,0,0],
          "translation" : [0,0,0],
          "rotate_coord" : [1.4, -0.1, 1.4],
          "animation": [
            [0,0,-60],
            [0,0,-45],
            [0,0,-30],
            [0,0,-15],
            [0, 0, 0],
            [0,0,15],
            [0,0,30],
            [0,0,45],
            [0,0,60]
          ]
      },
      {
        "name" : "left-arm",
        "vertices" : [
          
          -1.05, -3.3, 2.2,
          -1.85, -3.3, 2.2,
          -1.85,  -0.5, 2.2,
          -1.05,  -0.5, 2.2,
          
          -1.05, -3.3, 1.4,
          -1.05, -0.5,  1.4,
          -1.85, -0.5,  1.4,
          -1.85, -3.3, 1.4,
          
          -1.05, -0.5, 1.4,
          -1.05, -0.5, 2.2,
          -1.85, -0.5, 2.2,
          -1.85, -0.5, 1.4,
          
          -1.05, -3.3, 1.4,
          -1.85, -3.3, 1.4,
          -1.85, -3.3, 2.2,
          -1.05, -3.3, 2.2,
          
          -1.85, -3.3, 1.4,
          -1.85, -0.5, 1.4,
          -1.85, -0.5, 2.2,
          -1.85, -3.3, 2.2,
          
          -1.05, -3.3, 1.4,
          -1.05, -3.3, 2.2,
          -1.05, -0.5, 2.2,
          -1.05, -0.5, 1.4
          ],
        "indices" : [
            0, 1, 2, 0, 2, 3, 
            4, 5, 6, 4, 6, 7, 
            8, 9, 10, 8, 10, 11, 
            12, 13, 14, 12, 14, 15, 
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ],
        "color" : [
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1
      ],
        "children" : [],
        "siblings" : [],
        "is_shading_on" : false,
        "is_texture_on" : false,
        "rotation" : [0,0,0],
        "translation" : [0,0,0],
        "rotate_coord" : [-1.4, -0.1, 1.4],
        "animation": [
          [0,0,-60],
          [0,0,-45],
          [0,0,-30],
          [0,0,-15],
          [0, 0, 0],
          [0,0,15],
          [0,0,30],
          [0,0,45],
          [0,0,60]
        ]
    },
    {
        "name" : "right-foot",
        "vertices" : [
          
          1.05, -3.3, -2.2,
          1.85, -3.3, -2.2,
          1.85,  -0.5, -2.2,
          1.05,  -0.5, -2.2,
          
          1.05, -3.3, -1.4,
          1.05, -0.5,  -1.4,
          1.85, -0.5,  -1.4,
          1.85, -3.3, -1.4,
          
          1.05, -0.5, -1.4,
          1.05, -0.5, -2.2,
          1.85, -0.5, -2.2,
          1.85, -0.5, -1.4,
          
          1.05, -3.3, -1.4,
          1.85, -3.3, -1.4,
          1.85, -3.3, -2.2,
          1.05, -3.3, -2.2,
          
          1.85, -3.3, -1.4,
          1.85, -0.5, -1.4,
          1.85, -0.5, -2.2,
          1.85, -3.3, -2.2,
          
          1.05, -3.3, -1.4,
          1.05, -3.3, -2.2,
          1.05, -0.5, -2.2,
          1.05, -0.5, -1.4
          ],
        "indices" : [
            0, 1, 2, 0, 2, 3, 
            4, 5, 6, 4, 6, 7, 
            8, 9, 10, 8, 10, 11, 
            12, 13, 14, 12, 14, 15, 
            16, 17, 18, 16, 18, 19, 
            20, 21, 22, 20, 22, 23
        ],
        "color" : [
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1
      ],
        "children" : [],
        "siblings" : [],
        "is_shading_on" : false,
        "is_texture_on" : false,
        "rotation" : [0,0,0],
        "translation" : [0,0,0],
        "rotate_coord" : [1.4, -0.1, -1.4],
        "animation": [
          [0,0,-60],
          [0,0,-45],
          [0,0,-30],
          [0,0,-15],
          [0, 0, 0],
          [0,0,15],
          [0,0,30],
          [0,0,45],
          [0,0,60]
        ]
    },
    {
      "name" : "right-arm",
      "vertices" : [
        
        -1.05, -3.3, -2.2,
        -1.85, -3.3, -2.2,
        -1.85,  -0.5, -2.2,
        -1.05,  -0.5, -2.2,
        
        -1.05, -3.3, -1.4,
        -1.05, -0.5,  -1.4,
        -1.85, -0.5,  -1.4,
        -1.85, -3.3, -1.4,
        
        -1.05, -0.5, -1.4,
        -1.05, -0.5, -2.2,
        -1.85, -0.5, -2.2,
        -1.85, -0.5, -1.4,
        
        -1.05, -3.3, -1.4,
        -1.85, -3.3, -1.4,
        -1.85, -3.3, -2.2,
        -1.05, -3.3, -2.2,
        
        -1.85, -3.3, -1.4,
        -1.85, -0.5, -1.4,
        -1.85, -0.5, -2.2,
        -1.85, -3.3, -2.2,
        
        -1.05, -3.3, -1.4,
        -1.05, -3.3, -2.2,
        -1.05, -0.5, -2.2,
        -1.05, -0.5, -1.4
        ],
      "indices" : [
          0, 1, 2, 0, 2, 3, 
          4, 5, 6, 4, 6, 7,
          8, 9, 10, 8, 10, 11, 
          12, 13, 14, 12, 14, 15, 
          16, 17, 18, 16, 18, 19, 
          20, 21, 22, 20, 22, 23
      ],
      "color" : [
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1,
          1, 1, 1
    ],
      "children" : [],
      "siblings" : [],
      "is_shading_on" : false,
      "is_texture_on" : false,
      "rotation" : [0,0,0],
      "translation" : [0,0,0],
      "rotate_coord" : [-1.4, -0.1, -1.4],
      "animation": [
        [0,0,-60],
        [0,0,-45],
        [0,0,-30],
        [0,0,-15],
        [0, 0, 0],
        [0,0,15],
        [0,0,30],
        [0,0,45],
        [0,0,60]
      ]
  }
  ]
}