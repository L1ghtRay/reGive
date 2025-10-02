import express from "express";
import mongoose from "mongoose"; 
import User from "../models/users.js";
import Item from '../models/items.js'; 
import Category from '../models/categories.js';


    export const getSearchResults = async (req, res) => {
    const query = req.query.q; // e.g., "Stationery" or "baby doll"

    if (!query) {
        return res.render("../frontend/views/listing.ejs", { items: [] });
    }

    
    const regexQuery = new RegExp(query, 'i');
    let items = [];

    try {
        // --- STEP 1: Search by Category Name ---
        const category = await Category.findOne({ name: regexQuery });
        
        if (category) {
            // If the search query is a CATEGORY name (e.g., "Stationery"), 
            // return ALL items belonging to that category ID.
            items = await Item.find({ categoryId: category._id })
                              .populate('categoryId', 'name')
                              .populate('donorId', 'displayName email')
                              .exec();
        } 
        
        // --- STEP 2: Fallback Search (Item Name or Subcategory) ---
        if (items.length === 0) {
            // Search across item name, description, AND subcategory.
            items = await Item.find({
                $or: [
                    { name: regexQuery },
                    { description: regexQuery },
                    { subcategory: regexQuery } // <-- Checks the subcategory field!
                ]
            })
            .populate('categoryId', 'name')
            .populate('donorId', 'displayName email')
            .exec();
        }
        
        // 3. Render the results page
        res.render("itemListing.ejs", { items });

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).send("Error performing search.");
    }
};
