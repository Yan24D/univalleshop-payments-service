import { Inject, Injectable } from '@nestjs/common';
import type { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/entities/payment.entity';

@Injectable()
export class FindPaymentsByUserUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(userId: string): Promise<Payment[]> {
    return await this.paymentRepository.findByUserId(userId);
  }
}