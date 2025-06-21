import { env } from "../../config/env";




export class DiscordService {
  private readonly discordWebhookUrl = env.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [{
        image: {
          url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW9nNXRucWZ4NHMwdTRhZmFhY2hwbnQ3OTQyeXd4OWxuaXdsYnV2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif'
        }
      }]
    }

    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      throw new Error('Failed to send message to Discord');
      return false;
    }

    return true;
  }

}