import asyncHandler from "../utils/asyncHandler.js";
import { Restaurant } from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Dish } from "../models/dish.model.js";

// const getMenu = asyncHandler(async (req, res) => {
//     const { restaurantId } = req.params;

//     // Fetch the restaurant with active subscription and categories
//     const restaurant = await Restaurant.findOne({
//         _id: restaurantId,
//         "subscription.active": true, // Check for active subscription
//     })
//         .lean()
//         .select("RestaurantName categories"); // Include only required fields

//     if (!restaurant) {
//         return res
//             .status(404)
//             .json(
//                 new ApiResponse(404, null, "Restaurant not found or no active subscription")
//             );
//     }

//     console.log(restaurant)
//     // Fetch the dishes related to the restaurant
//     const dishes = await Dish.find({ dishOfTheRestaurant: restaurantId })
//         .lean()
//         .select("-dishOfTheRestaurant -createdAt -updatedAt");

       

//     // Send the response with the restaurant, dishes, and categories
//     return res.status(200).json({
//         success: true,
//         restaurant,
//         dishes,
//         categories: restaurant.categories, // Use categories from the restaurant
//     });
// });

// export { getMenu };

// const getMenu = asyncHandler(async (req, res) => {
//     const { restaurantId } = req.params;

//     // Fetch the restaurant with an active subscription and categories
//     const restaurant = await Restaurant.findOne({
//         _id: restaurantId,
//         "subscription.active": true, // Check for active subscription
//     })
//         .lean()
//         .select("RestaurantName categories"); // Include only required fields

//     if (!restaurant) {
//         return res
//             .status(404)
//             .json(
//                 new ApiResponse(404, null, "Restaurant not found or no active subscription")
//             );
//     }

//     console.log(restaurant);
//     // Fetch the dishes related to the restaurant
//     const dishes = await Dish.find({ dishOfTheRestaurant: restaurantId })
//         .lean()
//         .select("-dishOfTheRestaurant -createdAt -updatedAt");

//     // Safely map Cloudinary URLs to dishes
//     const mappedDishes = dishes.map((dish) => ({
//         ...dish,
//         dishImage: Array.isArray(dish.dishImage)
//             ? dish.dishImage.map(
//                   (img) =>
//                       `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${img}`
//               )
//             : [], // If dishImage is undefined or not an array, default to an empty array
//     }));

//     // Send the response with the restaurant, dishes, and categories
//     return res.status(200).json({
//         success: true,
//         restaurant,
//         dishes: mappedDishes,
//         categories: restaurant.categories, // Use categories from the restaurant
//     });
// });

// export { getMenu };


const getMenu = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;

    // Fetch the restaurant with an active subscription and categories
    const restaurant = await Restaurant.findOne({
        _id: restaurantId,
        "subscription.active": true, // Check for active subscription
    })
        .lean()
        .select("RestaurantName categories");

    if (!restaurant) {
        return res
            .status(404)
            .json(
                new ApiResponse(404, null, "Restaurant not found or no active subscription")
            );
    }

    // Fetch the dishes related to the restaurant
    const dishes = await Dish.find({ dishOfTheRestaurant: restaurantId })
        .lean()
        .select("-dishOfTheRestaurant -createdAt -updatedAt");

    // Assuming dish.dishImage already contains full URLs from Cloudinary
    const mappedDishes = dishes.map((dish) => ({
        ...dish,
        dishImage: Array.isArray(dish.dishImage) ? dish.dishImage : [dish.dishImage || "default_image_url"], // Ensure it's an array, fallback if needed
    }));
    

    return res.status(200).json({
        success: true,
        restaurant,
        dishes: mappedDishes,
        categories: restaurant.categories, // Use categories from the restaurant
    });
});

export { getMenu };

