import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/entities/payment.entity';

@Injectable()
export class FindPaymentByIdUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment;
  }
}