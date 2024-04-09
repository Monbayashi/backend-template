import { DomainEvent } from './domain-event';

export interface IDomainEventPublisher {
  publish(domainEvents: DomainEvent[]): Promise<void>;
}
