import { Component } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass, NgStyle, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  userInput = '';
  chatHistory = [
    {
      sender: 'user',
      text: 'Hello SBSC!',
    },
    { sender: 'ai', text: 'Hello! How can I assist you today?' },
  ];
  isWaitingForResponse = false;

  constructor() {}

  async sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message to chat
    const userMessage = this.userInput;
    this.chatHistory.push({ sender: 'user', text: `${this.userInput}` });
    this.userInput = ''; // Clear input immediately

    // Create and add temporary AI message
    const aiMessageIndex =
      this.chatHistory.push({
        sender: 'ai',
        text: '...', // Placeholder while waiting for response
      }) - 1;

    this.isWaitingForResponse = true;

    // Send user message to the server
    try {
      const response = await fetch('https://nx-backend.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk;

        // Update the AI message progressively
        this.chatHistory[aiMessageIndex].text = aiResponse;
      }
    } catch (error) {
      console.error('Error:', error);
      this.chatHistory[aiMessageIndex].text = (error as Error)
        .toString()
        .includes('quota')
        ? 'API quota exceeded. Please try again later.'
        : 'Sorry, an error occurred.';
    } finally {
      this.isWaitingForResponse = false;
    }
  }
}
