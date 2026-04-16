import { Body, Controller, Get, Param, Patch, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { CreatePaymentRequestDto } from '../dto/create-payment-request.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePaymentRequestDto) {
    const payment = await this.createPaymentUseCase.execute({
      orderId: dto.orderId,
      userId: dto.userId,
      amount: dto.amount,
      method: dto.method,
    });

    return {
      id: payment.getId(),
      orderId: payment.getOrderId(),
      userId: payment.getUserId(),
      amount: payment.getAmount(),
      method: payment.getMethod(),
      status: payment.getStatus(),
      createdAt: payment.getCreatedAt(),
    };
  }
}