import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModel, PaymentSchema } from './infrastructure/persistence/payment.schema';
import { PaymentRepositoryImpl } from './infrastructure/persistence/payment.repository.impl';
import { PAYMENT_REPOSITORY } from './domain/repositories/payment.repository';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { CompletePaymentUseCase } from './application/use-cases/complete-payment.use-case';
import { CancelPaymentUseCase } from './application/use-cases/cancel-payment.use-case';
import { FindPaymentByIdUseCase } from './application/use-cases/find-payment-by-id.use-case';
import { FindPaymentsByUserUseCase } from './application/use-cases/find-payments-by-user.use-case';
import { PaymentsController } from './presentation/controllers/payments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentModel.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentRepositoryImpl,
    },
    CreatePaymentUseCase,
    CompletePaymentUseCase,
    CancelPaymentUseCase,
    FindPaymentByIdUseCase,
    FindPaymentsByUserUseCase,
  ],
})
export class PaymentsModule {}