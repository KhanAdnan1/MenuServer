import asyncHandler from "../utils/asyncHandler.js";
import { Restaurant } from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Dish } from "../models/dish.model.js";

// const getMenu = asyncHandler(async (req, res) => {
//     // Fetch restaurantId from the request parameters
//     const { restaurantId } = req.params;

//     // Fetch the restaurant document by its ID and ensure it has an active subscription
//     const restaurant = await Restaurant.findOne({
//         _id: restaurantId,
//         "subscription.active": true, // Check for active subscription
//     })
//         .lean()
//         .select("-RestaurantManagerName -ManagerContact -RestaurantAddress -restaurantAddedBy -subscription")



//     if (!restaurant) {
//         return res
//             .status(404)
//             .json(
//                 new ApiResponse(404, null, "Restaurant not found or no active subscription")
//             );
//     }
//     // Fetch the dishes related to the restaurant
//     const dishes = await Dish.find({ dishOfTheRestaurant: restaurantId })
//         .lean()
//         .select("-dishOfTheRestaurant -createdAt -updatedAt")

//     // Send the response with the restaurant and its dishes
//     return res.status(200).json({

//         success: true,
//         restaurant,
//         dishes,
//     });

   
// });

// export { getMenu };

//     // Check if the restaurant is found and has an active subscription
//     // if (!restaurant) {
//     //     console.log("Restaurant not found or does not have an active subscription");
//     //     return res.status(404).json({
//     //         success: false,
//     //         message: "Restaurant not found or does not have an active subscription",
//     //     });
//     // }

//      // return res
//     //     .status(200)
//     //     .json(
//     //         new ApiResponse(
//     //             200,
//     //             {
//     //                 restaurant,
//     //                 dishes
//     //             }
//     //         )
//     //     )




const getMenu = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;

    // Fetch the restaurant with active subscription and categories
    const restaurant = await Restaurant.findOne({
        _id: restaurantId,
        "subscription.active": true, // Check for active subscription
    })
        .lean()
        .select("RestaurantName categories"); // Include only required fields

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

    // Send the response with the restaurant, dishes, and categories
    return res.status(200).json({
        success: true,
        restaurant,
        dishes,
        categories: restaurant.categories, // Use categories from the restaurant
    });
});

export { getMenu };

