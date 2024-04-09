import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AppRequestContextService {
  private requestId: string;

  getRequestId(): string {
    return this.requestId;
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }
}
