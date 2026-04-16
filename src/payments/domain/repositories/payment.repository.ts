import { Payment } from '../entities/payment.entity';

export interface PaymentRepository {
  save(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByOrderId(orderId: string): Promise<Payment | null>;
  findByUserId(userId: string): Promise<Payment[]>;
  update(payment: Payment): Promise<Payment>;
}

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';