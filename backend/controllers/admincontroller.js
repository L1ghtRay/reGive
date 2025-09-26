import express from "express";
import user from "../models/users.js";
import item from "../models/items.js";
import transactions from "../models/transaction.js";
import reports from "../models/reports.js";

export const FetchUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const FetchItems = async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const FetchTransactions = async (req, res) => {
  try {
    const items = await transactions.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const FetchReports = async (req, res) => {
  try {
    const items = await reports.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
