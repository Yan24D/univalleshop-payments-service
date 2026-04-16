import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentModel, PaymentDocument } from './payment.schema';
import { PaymentMapper } from '../mappers/payment.mapper';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectModel(PaymentModel.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}

  async save(payment: Payment): Promise<Payment> {
    const data = PaymentMapper.toPersistence(payment);
    const created = await this.paymentModel.create(data);
    return PaymentMapper.toDomain(created);
  }

  async findById(id: string): Promise<Payment | null> {
    const doc = await this.paymentModel.findById(id).exec();
    if (!doc) return null;
    return PaymentMapper.toDomain(doc);
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const doc = await this.paymentModel.findOne({ orderId }).exec();
    if (!doc) return null;
    return PaymentMapper.toDomain(doc);
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    const docs = await this.paymentModel.find({ userId }).exec();
    return docs.map(doc => PaymentMapper.toDomain(doc));
  }

  async update(payment: Payment): Promise<Payment> {
    const data = PaymentMapper.toPersistence(payment);
    const updated = await this.paymentModel
      .findByIdAndUpdate(payment.getId(), data, { new: true })
      .exec();
    if (!updated) throw new Error(`Payment ${payment.getId()} not found`);
    return PaymentMapper.toDomain(updated);
  }
}