import {loadCustomers,loadPlataforms,loadInvoices,loadTransactions} from './load_file.js';;

(async () => {
    try {
        await loadCustomers();
        await loadPlataforms();
        await loadInvoices();
        await loadTransactions();
        console.log('Data loading process completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error in the data loading process:', error);
        process.exit(1);
    }
})();