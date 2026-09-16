import assert from 'node:assert/strict';
import test from 'node:test';
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCertificateDto } from './create-certificate.dto.js';

test('CreateCertificateDto accepts certificate clauses', async () => {
    const dto = plainToInstance(CreateCertificateDto, {
      partnerOneName: 'Ana',
      partnerTwoName: 'Bia',
      coupleDate: '2026-09-16',
      location: 'São Paulo',
      accentKey: 'burgundy',
      clauses: [
        {
          id: 'b45af942-1193-4d16-b1ae-75285e1b50bf',
          text: 'Dividir a batata frita.',
        },
      ],
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    assert.deepEqual(errors, []);
    assert.deepEqual(dto.clauses.map(({ id, text }) => ({ id, text })), [
      {
        id: 'b45af942-1193-4d16-b1ae-75285e1b50bf',
        text: 'Dividir a batata frita.',
      },
    ]);
});
