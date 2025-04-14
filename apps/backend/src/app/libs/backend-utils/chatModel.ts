import mongoose, { Schema } from 'mongoose';

// Define a Mongoose schema for your chatHistory collection
const chatSchema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    message: { type: String, required: true },
    sender: { type: String, enum: ['user', 'ai'], required: true },
  },
  { collection: 'chatHistory' } // My MongoDB collection name
);

// Define the Mongoose model
const ChatHistory =
  mongoose.models.ChatHistory || mongoose.model('ChatHistory', chatSchema);

export default ChatHistory;
