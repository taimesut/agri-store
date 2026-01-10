import { IsEnum, IsNumber } from 'class-validator';

enum PaymentProvider {
  COD = 'COD',
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export class PaymentDTO {
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
}

export class CreatePaymentDTO {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsNumber()
  amount: number;
}
