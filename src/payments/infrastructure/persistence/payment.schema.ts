import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentStatus, PaymentMethod } from '../../domain/entities/payment.entity';

export type PaymentDocument = PaymentModel & Document;

@Schema({ collection: 'payments', timestamps: true })
export class PaymentModel {
  @Prop({ required: true })
  orderId!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true, enum: PaymentMethod })
  method!: PaymentMethod;

  @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  createdAt!: Date;
  updatedAt!: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentModel);