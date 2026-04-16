export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  TRANSFER = 'TRANSFER',
}

export class Payment {
  constructor(
    private readonly id: string,
    private readonly orderId: string,
    private readonly userId: string,
    private readonly amount: number,
    private readonly method: PaymentMethod,
    private status: PaymentStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  getId(): string { return this.id; }
  getOrderId(): string { return this.orderId; }
  getUserId(): string { return this.userId; }
  getAmount(): number { return this.amount; }
  getMethod(): PaymentMethod { return this.method; }
  getStatus(): PaymentStatus { return this.status; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  complete(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be completed');
    }
    this.status = PaymentStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  fail(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be failed');
    }
    this.status = PaymentStatus.FAILED;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be cancelled');
    }
    this.status = PaymentStatus.CANCELLED;
    this.updatedAt = new Date();
  }
}