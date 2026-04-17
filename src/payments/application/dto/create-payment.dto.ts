import { PaymentMethod } from '../../domain/entities/payment.entity';

export class CreatePaymentDto {
  orderId!: string;
  userId!: string;
  amount!: number;
  method!: PaymentMethod;
}