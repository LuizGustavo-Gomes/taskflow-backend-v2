
/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => { // <-- Use 'export const'
    pgm.createTable('users', {
        id: 'id', // shortcut for { type: 'SERIAL', primaryKey: true }
        username: { type: 'VARCHAR(50)', notNull: true, unique: true },
        email: { type: 'VARCHAR(100)', notNull: true, unique: true },
        password: { type: 'VARCHAR(255)', notNull: true },
        created_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('NOW()')
        },
    });

    pgm.createTable('tasks', {
        id: 'id',
        title: { type: 'VARCHAR(255)', notNull: true },
        description: { type: 'TEXT' },
        completed: { type: 'BOOLEAN', notNull: true, default: false },
        user_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        },
        created_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('NOW()')
        },
        due_date: { type: 'DATE' }
    });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => { // <-- Use 'export const'
    pgm.dropTable('tasks');
    pgm.dropTable('users');
};