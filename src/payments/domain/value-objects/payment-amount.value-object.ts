export class PaymentAmount {
  private readonly value: number;

  constructor(amount: number) {
    this.validate(amount);
    this.value = amount;
  }

  private validate(amount: number): void {
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than zero');
    }
    if (!Number.isFinite(amount)) {
      throw new Error('Payment amount must be a valid number');
    }
    if (parseFloat(amount.toFixed(2)) !== amount) {
      throw new Error('Payment amount must have at most 2 decimal places');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: PaymentAmount): boolean {
    return this.value === other.getValue();
  }

  toString(): string {
    return `$${this.value.toFixed(2)}`;
  }
}