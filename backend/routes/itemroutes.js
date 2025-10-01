import express from "express";
import mongoose from "mongoose"; 


import { getSearchResults } from '../controllers/itemController.js';
const router = express.Router();
router.get('/search', getSearchResults);
export default router;


/*
import express from "express";
import mongoose from "mongoose"; 

import User from "../models/users.js"; // Target for donorId population
import Item from '../models/items.js'; 
import Category from '../models/categories.js'; 

// 1. Initialize the Express Router
const router = express.Router();

// Define a filter to ensure linked documents exist (preventing null/undefined errors).
// This excludes items where the donor or category relationship is broken.
const VALIDITY_FILTER = { 
    donorId: { $ne: null }, 
    categoryId: { $ne: null } 
};


// 2. Define the Search Controller Function
export const getSearchResults = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.render("../frontend/views/listing.ejs", { items: [] });
    }

    // Convert the search query to a case-insensitive regular expression
    const regexQuery = new RegExp(query, 'i');
    let items = [];

    try {
        // --- STEP 1: Search by Category Name ---
        const category = await Category.findOne({ name: regexQuery });
        
        if (category) {
            // Find items by category ID AND apply the validity filter
            items = await Item.find({ 
                categoryId: category._id,
                ...VALIDITY_FILTER // FIX: Only return valid, non-corrupt items 
            })
            .populate('categoryId', 'name')
            .populate('donorId', 'name email')
            .exec();
        } 
        
        // --- STEP 2: Fallback Search (Item Name, Description, or Subcategory) ---
        if (items.length === 0) {
            
            // Define the complex search criteria using $and to enforce validity
            const itemSearchCriteria = {
                $and: [
                    { ...VALIDITY_FILTER }, // FIX: Ensure donorId and categoryId are not null
                    { $or: [
                        { name: regexQuery },
                        { description: regexQuery },
                        { subcategory: regexQuery } 
                    ]}
                ]
            };
            
            items = await Item.find(itemSearchCriteria)
            .populate('categoryId', 'name')
            .populate('donorId', 'name email')
            .exec();
        }
        
        // 3. Render the results page
        return res.render("../frontend/views/listing.ejs", { items });

    } catch (error) {
        // Log the specific error to the console for real debugging
        console.error("Critical Search Execution Error for query:", query, error);
        
        // Respond with the 500 status
        return res.status(500).send("Error performing search.");
    }
};

// 3. Define the Route using the Controller Function
router.get('/search', getSearchResults);

// 4. Export the Router
export default router;
*/