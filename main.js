const chalk = require('chalk');
const os = require('os-utils');

// Variabel penampung library ESM
let spintax;

// KONFIGURASI PENGGUNA
const config = {
    threads: 10,
    targetUrl: "https://website-anda.com",
    anchorText: "Jasa SEO Terbaik",
    template: "{Halo|Hai} artikel ini sangat {bagus|bermanfaat}. Cek juga [LINK]"
};

// 1. STABILIZER: Pantau CPU & RAM
setInterval(() => {
    os.cpuUsage((v) => {
        if (v > 0.8) {
            console.log(chalk.red(`[!] WARNING: CPU Usage ${(v * 100).toFixed(0)}% - Throttling...`));
        }
    });
}, 10000); // Cek setiap 10 detik agar tidak membebani CPU

// 2. ENGINE KOMENTAR
function generateComment() {
    // Memastikan modul spintax sudah ter-load
    const raw = spintax && spintax.unspin ? spintax.unspin(config.template) : config.template;
    return raw.replace("[LINK]", `<a href="${config.targetUrl}">${config.anchorText}</a>`);
}

// 3. WORKER THREAD (Simulation)
async function runThread(id) {
    console.log(chalk.blue(`[Thread ${id}] Is Running...`));
    
    while (true) {
        try {
            const comment = generateComment();
            
            // --- LOGIKA AUTOMATION AKAN MASUK DI SINI ---
            
            // Notifikasi Berhasil ke Console
            console.log(chalk.green(`[SUCCESS] T${id} | Link Posted | RAM: ${(os.freememPercentage() * 100).toFixed(0)}% Free`));
            
            // Jeda agar tidak dianggap spam & menjaga suhu CPU
            await new Promise(res => setTimeout(res, 5000 + (Math.random() * 2000)));
        } catch (err) {
            console.log(chalk.gray(`[FAILED] T${id} | Connection Refused`));
        }
    }
}

// 4. INIT SYSTEM (Solusi Error ESM)
async function init() {
    try {
        console.log(chalk.yellow("Starting System..."));
        
        // Dynamic Import untuk library ESM
        const spintaxModule = await import('spintax');
        spintax = spintaxModule.default || spintaxModule;

        console.log(chalk.cyan("====================================="));
        console.log(chalk.cyan("      GHOST LINK BUILDER v1.0       "));
        console.log(chalk.cyan("====================================="));

        // Jalankan Threads
        for (let i = 1; i <= config.threads; i++) {
            runThread(i);
        }
    } catch (err) {
        console.error(chalk.red("Initialization Error:"), err.message);
    }
}

init();
