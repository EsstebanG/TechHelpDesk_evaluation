import { DataSource } from 'typeorm';
import { Ticket } from '../../modules/tickets/entities/ticket.entity';
import { Client } from '../../modules/clients/entities/client.entity';
import { Technician } from '../../modules/technicians/entities/technician.entity';
import { Category } from '../../modules/categories/entities/category.entity';
import { TicketStatus } from '../../common/enums/ticket-status.enum';
import { TicketPriority } from '../../common/enums/ticket-priority.enum';

export async function ticketSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting ticket seed process...');

    const ticketRepository = dataSource.getRepository(Ticket);
    const clientRepository = dataSource.getRepository(Client);
    const technicianRepository = dataSource.getRepository(Technician);
    const categoryRepository = dataSource.getRepository(Category);

    const count = await ticketRepository.count();

    if (count === 0) {
        const client = await clientRepository.findOne({ where: { full_name: 'Juan Pérez' } });
        const technician = await technicianRepository.findOne({ where: { full_name: 'Carlos Sánchez' } });
        const category = await categoryRepository.findOne({ where: { name: 'Request' } });

        if (!client || !technician || !category) {
            console.log('⚠️ Missing data, skipping ticket creation.');
            return;
        }

        const existingTicket = await ticketRepository.findOne({
            where: { title: 'Networking Issue', client: { id_client: client.id_client } },
        });

        if (existingTicket) {
            console.log(`Ticket 'Networking Issue' already exists for client ${client.contact_email}. Skipping...`);
        } else {
            const ticket = {
                title: 'Networking Issue',
                description: 'Unable to connect to the internet',
                status: TicketStatus.OPEN,
                priority: TicketPriority.MEDIUM,
                client,
                technician,
                category,
            };

            await ticketRepository.save(ticket);
            console.log('✅ Ticket created successfully!');
        }
    } else {
        console.log('⚠️ Tickets already exist, seed omitted.');
    }

    console.log('🌾 Ticket seed processing complete!');
}
