import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class GabjPingConnections {
  private readonly logger = new Logger(GabjPingConnections.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    try {
      const targetUrl = 'https://twowatched-back.onrender.com/';
      this.logger.log(`Disparando ping para ${targetUrl}`);
      const response = await axios.get(targetUrl);
      console.log(
        '->-.' +
          (typeof response.data === 'object'
            ? JSON.stringify(response.data)?.substring(0, 200)
            : response.data),
      );
      this.logger.log(`Ping executado com sucesso: status ${response.status}`);
    } catch (error: any) {
      this.logger.error(`Erro ao disparar ping: ${error.message}`);
    }
  }
}
