import { Body, Controller, Get, Param, Patch, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { CompletePaymentUseCase } from '../../application/use-cases/complete-payment.use-case';
import { CancelPaymentUseCase } from '../../application/use-cases/cancel-payment.use-case';
import { FindPaymentByIdUseCase } from '../../application/use-cases/find-payment-by-id.use-case';
import { FindPaymentsByUserUseCase } from '../../application/use-cases/find-payments-by-user.use-case';
import { CreatePaymentRequestDto } from '../dto/create-payment-request.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly completePaymentUseCase: CompletePaymentUseCase,
    private readonly cancelPaymentUseCase: CancelPaymentUseCase,
    private readonly findPaymentByIdUseCase: FindPaymentByIdUseCase,
    private readonly findPaymentsByUserUseCase: FindPaymentsByUserUseCase,
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
    return this.toResponse(payment);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const payments = await this.findPaymentsByUserUseCase.execute(userId);
    return payments.map(p => this.toResponse(p));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const payment = await this.findPaymentByIdUseCase.execute(id);
    return this.toResponse(payment);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    const payment = await this.completePaymentUseCase.execute(id);
    return this.toResponse(payment);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const payment = await this.cancelPaymentUseCase.execute(id);
    return this.toResponse(payment);
  }

  private toResponse(payment: any) {
    return {
      id: payment.getId(),
      orderId: payment.getOrderId(),
      userId: payment.getUserId(),
      amount: payment.getAmount(),
      method: payment.getMethod(),
      status: payment.getStatus(),
      createdAt: payment.getCreatedAt(),
      updatedAt: payment.getUpdatedAt(),
    };
  }
}