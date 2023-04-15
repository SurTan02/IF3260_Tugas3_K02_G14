const jsonObjTes = {
    "model_name" : "testing_obj",
    "root_name" : "body",
    "texture_mode" : 3,
    "parts": [
        {
            "name" : "body",
            "vertices" : [
                // Front face
                -2, -1, 1,
                2, -1, 1,
                2, 1, 1,
                -2, 1, 1,
                // Back face
                -2, -1, -1,
                -2, 1, -1,
                2, 1, -1,
                2, -1, -1,
                // Top face
                -2, 1, -1,
                -2, 1, 1,
                2, 1, 1,
                2, 1, -1,
                // Bottom face
                -2, -1, -1,
                2, -1, -1,
                2, -1, 1,
                -2, -1, 1,
                // Right face
                2, -1, -1,
                2, 1, -1,
                2, 1, 1,
                2, -1, 1,
                // Left face
                -2, -1, -1,
                -2, -1, 1,
                -2, 1, 1,
                -2, 1, -1,
                ],
            "indices" : [
                0, 1, 2, 0, 2, 3, // Front face
                4, 5, 6, 4, 6, 7, // Back face
                8, 9, 10, 8, 10, 11, // Top face
                12, 13, 14, 12, 14, 15, // Bottom face
                16, 17, 18, 16, 18, 19, // Right face
                20, 21, 22, 20, 22, 23, // Left face
            ],
            "children" : ["head", "left-arm", "right-arm"],
            "siblings" : [],
            "is_shading_on" : false,
            "is_texture_on" : false,
            "rotation" : [0,0,0],
            "translation" : [0,0,0],
            "rotate_coord" : [],
            "min_rotate" : 0,
            "max_rotate" : 0,
            "anim_speed_factor" : 0,
            "is_rotating_up" : true
        },
        {
            "name" : "head",
            "vertices" : [
                // Front face
                -1, 1, 1,
                1, 1, 1,
                1, 3, 1,
                -1, 3, 1,
                // Back face
                -1, 1, -1,
                -1, 3, -1,
                1, 3, -1,
                1, 1, -1,
                // Top face
                -1, 3, -1,
                -1, 3, 1,
                1, 3, 1,
                1, 3, -1,
                // Bottom face
                -1, 1, -1,
                1, 1, -1,
                1, 1, 1,
                -1, 1, 1,
                // Right face
                1, 1, -1,
                1, 3, -1,
                1, 3, 1,
                1, 1, 1,
                // Left face
                -1, 1, -1,
                -1, 1, 1,
                -1, 3, 1,
                -1, 3, -1
                ],
            "indices" : [
                0, 1, 2, 0, 2, 3, // Front face
                4, 5, 6, 4, 6, 7, // Back face
                8, 9, 10, 8, 10, 11, // Top face
                12, 13, 14, 12, 14, 15, // Bottom face
                16, 17, 18, 16, 18, 19, // Right face
                20, 21, 22, 20, 22, 23, // Left face
            ],
            "color" : [
              1, 1, 1
          ],
            "children" : [],
            "siblings" : [],
            "is_shading_on" : false,
            "is_texture_on" : false,
            "rotation" : [0,0,0],
            "translation" : [0,0,0],
            "rotate_coord" : [],
            "min_rotate" : 0,
            "max_rotate" : 0,
            "anim_speed_factor" : 0,
            "is_rotating_up" : true
        },
        {
            "name" : "left-arm",
            "vertices" : [
              // Front face
              2, -5, 0.5,
              3, -5, 0.5,
              3,  1, 0.5,
              2,  1, 0.5,
              // Back face
              2, -5, -0.5,
              2, 1,  -0.5,
              3, 1,  -0.5,
              3, -5, -0.5,
              // Top face
              2, 1, -0.5,
              2, 1, 0.5,
              3, 1, 0.5,
              3, 1, -0.5,
              // Bottom face
              2, -5, -0.5,
              3, -5, -0.5,
              3, -5, 0.5,
              2, -5, 0.5,
              // Right face
              3, -5, -0.5,
              3, 1, -0.5,
              3, 1, 0.5,
              3, -5, 0.5,
              // Left face
              2, -5, -0.5,
              2, -5, 0.5,
              2, 1, 0.5,
              2, 1, -0.5,
              ],
            "indices" : [
                0, 1, 2, 0, 2, 3, // Front face
                4, 5, 6, 4, 6, 7, // Back face
                8, 9, 10, 8, 10, 11, // Top face
                12, 13, 14, 12, 14, 15, // Bottom face
                16, 17, 18, 16, 18, 19, // Right face
                20, 21, 22, 20, 22, 23, // Left face
            ],
            "color" : [
              0, 0, 0, 0, 2, 3, // Front face
              4, 5, 6, 4, 6, 7, // Back face
              8, 9, 10, 8, 10, 11, // Top face
              12, 13, 14, 12, 14, 15, // Bottom face
              16, 17, 18, 16, 18, 19, // Right face
              20, 21, 22, 20, 22, 23, // Left face
          ],
            "children" : [],
            "siblings" : [],
            "is_shading_on" : false,
            "is_texture_on" : false,
            "rotation" : [0,0,0],
            "translation" : [0,0,0],
            "rotate_coord" : [2, 1, 0.5],
            "min_rotate" : 0,
            "max_rotate" : 0,
            "anim_speed_factor" : 0,
            "is_rotating_up" : true
        },
        {
          "name" : "right-arm",
          "vertices" : [
            // Front face
            -2, -5, 0.5,
            -3, -5, 0.5,
            -3,  1, 0.5,
            -2,  1, 0.5,
            // Back face
            -2, -5, -0.5,
            -2, 1,  -0.5,
            -3, 1,  -0.5,
            -3, -5, -0.5,
            // Top face
            -2, 1, -0.5,
            -2, 1, 0.5,
            -3, 1, 0.5,
            -3, 1, -0.5,
            // Bottom face
            -2, -5, -0.5,
            -3, -5, -0.5,
            -3, -5, 0.5,
            -2, -5, 0.5,
            // Right face
            -3, -5, -0.5,
            -3, 1, -0.5,
            -3, 1, 0.5,
            -3, -5, 0.5,
            // Left face
            -2, -5, -0.5,
            -2, -5, 0.5,
            -2, 1, 0.5,
            -2, 1, -0.5,
            ],
          "indices" : [
              0, 1, 2, 0, 2, 3, // Front face
              4, 5, 6, 4, 6, 7, // Back face
              8, 9, 10, 8, 10, 11, // Top face
              12, 13, 14, 12, 14, 15, // Bottom face
              16, 17, 18, 16, 18, 19, // Right face
              20, 21, 22, 20, 22, 23, // Left face
          ],
          "color" : [
            0, 0, 0, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            8, 9, 10, 8, 10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23, // Left face
        ],
          "children" : [],
          "siblings" : [],
          "is_shading_on" : false,
          "is_texture_on" : false,
          "rotation" : [0,0,0],
          "translation" : [0,0,0],
          "rotate_coord" : [2, 1, 0.5],
          "min_rotate" : 0,
          "max_rotate" : 0,
          "anim_speed_factor" : 0,
          "is_rotating_up" : true
      }
    ]
    
    
}