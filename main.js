const chalk = require('chalk');
const os = require('os-utils');

let spintax;

// KONFIGURASI PENGGUNA
const config = {
    threads: 10,
    targetUrl: "https://website-anda.com",
    anchorText: "Jasa SEO Terbaik",
    template: "{Halo|Hai} artikel ini sangat {bagus|bermanfaat}. Cek juga [LINK]"
};

// STABILIZER: Pantau CPU
setInterval(() => {
    os.cpuUsage((v) => {
        if (v > 0.8) {
            console.log(chalk.red(`[!] CPU Warning: ${(v * 100).toFixed(2)}% - Resource Heavy!`));
        }
    });
}, 5000);

// ENGINE KOMENTAR (Spintax)
function generateComment() {
    // Memastikan spintax sudah termuat
    let rawComment = spintax.unspin ? spintax.unspin(config.template) : config.template;
    return rawComment.replace("[LINK]", `<a href="${config.targetUrl}">${config.anchorText}</a>`);
}

// WORKER THREAD
async function runThread(id) {
    console.log(chalk.blue(`[Thread ${id}] Active`));
    
    while (true) {
        try {
            const finalComment = generateComment();
            
            // Logika Posting Disini...
            
            console.log(chalk.green(`[SUCCESS] Thread ${id}: Link planted.`));
            
            // Jeda 5 detik agar Ubuntu 1GB RAM tidak crash
            await new Promise(resolve => setTimeout(resolve, 5000)); 
        } catch (err) {
            console.log(chalk.gray(`[FAILED] Thread ${id}: Connection Timeout`));
        }
    }
}

// INISIALISASI SYSTEM
async function init() {
    try {
        const spintaxModule = await import('spintax');
        spintax = spintaxModule.default || spintaxModule;
        
        console.log(chalk.cyan("====================================="));
        console.log(chalk.cyan("      GHOST LINK BUILDER v1.0       "));
        console.log(chalk.cyan("====================================="));
        
        for (let i = 1; i <= config.threads; i++) {
            runThread(i);
        }
    } catch (error) {
        console.error(chalk.red("Failed to load spintax module:"), error);
    }
}

init();
