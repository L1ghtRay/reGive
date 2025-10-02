import Item from '../models/items.js';

// **Simplified Filter:** Only check for essential display fields (Name, Description).
// This guarantees that any recently donated item with basic text data will show up.
const ESSENTIAL_FILTER = { 
    name: { $exists: true, $ne: "" },
    description: { $exists: true, $ne: "" }
};



export const getHomePage = async (req, res) => {
    try {
        // Find the latest 5 items that meet the ESSENTIAL_FILTER
        /*const frequentItems = await Item.find(ESSENTIAL_FILTER) 
            .sort({ createdAt: -1 }) // Sort by creation date (latest first)
            .limit(5) // Limit to 5 items
            .select('name description imageURL')
            .exec();*/


            const frequentItems = await Item.find(ESSENTIAL_FILTER)
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('donorId', 'displayName email')   
    .populate('categoryId', 'name')         
    .select('name description imageURL donorId categoryId createdAt')
    .exec();



               // 🎯 DEBUG LINE: Log the number of items found
        console.log(`[HOMEPAGE DEBUG] Items Found: ${frequentItems.length}`);
        
        // 🎯 DEBUG LINE: Log the actual items (first item only for brevity)
        if (frequentItems.length > 0) {
            console.log(`[HOMEPAGE DEBUG] Latest Item Name: ${frequentItems[0].name}`);
        }
        
        res.render("home", { 
            frequentItems: frequentItems 
        });

    } catch (error) {
        console.error("Error fetching essential items for homepage:", error);
        res.render("home", { 
            frequentItems: [] 
        });
    }
};