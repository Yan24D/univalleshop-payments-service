import { Inject, Injectable } from '@nestjs/common';
import { Payment, PaymentStatus } from '../../domain/entities/payment.entity';
import type { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '../../domain/repositories/payment.repository';
import { PaymentAmount } from '../../domain/value-objects/payment-amount.value-object';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    const paymentAmount = new PaymentAmount(dto.amount);

    const payment = new Payment(
      uuidv4(),
      dto.orderId,
      dto.userId,
      paymentAmount.getValue(),
      dto.method,
      PaymentStatus.PENDING,
      new Date(),
      new Date(),
    );

    return await this.paymentRepository.save(payment);
  }
}