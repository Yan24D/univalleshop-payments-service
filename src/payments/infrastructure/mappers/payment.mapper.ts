import { Payment, PaymentStatus, PaymentMethod } from '../../domain/entities/payment.entity';
import { PaymentDocument } from '../persistence/payment.schema';

export class PaymentMapper {
  static toDomain(doc: PaymentDocument): Payment {
    return new Payment(
      doc._id.toString(),
      doc.orderId,
      doc.userId,
      doc.amount,
      doc.method as PaymentMethod,
      doc.status as PaymentStatus,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(payment: Payment): Partial<PaymentDocument> {
    return {
      orderId: payment.getOrderId(),
      userId: payment.getUserId(),
      amount: payment.getAmount(),
      method: payment.getMethod(),
      status: payment.getStatus(),
    };
  }
}