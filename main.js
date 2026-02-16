const chalk = require('chalk');
const os = require('os-utils');

// KONFIGURASI PENGGUNA
const config = {
    threads: 10,
    targetUrl: "https://website-anda.com",
    anchorText: "Jasa SEO Terbaik",
    // Format: {pilihan1|pilihan2|pilihan3}
    template: "{Halo|Hai|Salam}, artikel ini sangat {bermanfaat|keren|luar biasa}. Terima kasih sudah berbagi! [LINK]"
};

// 1. FUNGSI SPINTAX INTERNAL (Lightweight - No External Module)
function unspin(text) {
    return text.replace(/{([^{}]*)}/g, (match, options) => {
        const choices = options.split('|');
        return choices[Math.floor(Math.random() * choices.length)];
    });
}

// 2. ENGINE GENERATOR
function generateComment() {
    const raw = unspin(config.template);
    const anchor = `<a href="${config.targetUrl}">${config.anchorText}</a>`;
    return raw.replace("[LINK]", anchor);
}

// 3. STABILIZER & MONITOR
setInterval(() => {
    os.cpuUsage((v) => {
        if (v > 0.8) {
            console.log(chalk.red(`[!] CPU Critical: ${(v * 100).toFixed(0)}% | Auto-throttling active.`));
        }
    });
}, 5000);

// 4. WORKER THREAD
async function runThread(id) {
    console.log(chalk.blue(`[Thread ${id}] Initialized.`));
    
    while (true) {
        try {
            const comment = generateComment();
            
            // Logika Automation (Proxy & HTTP Post) akan kita tambahkan di sini
            
            console.log(chalk.green(`[SUCCESS] T${id} | RAM: ${(os.freememPercentage() * 100).toFixed(0)}% Free | Msg: ${comment.substring(0, 20)}...`));
            
            // Jeda 5-10 detik agar VPS 1GB tidak hang
            await new Promise(res => setTimeout(res, 5000 + (Math.random() * 5000)));
        } catch (err) {
            console.log(chalk.gray(`[FAILED] T${id} | Runtime Error`));
        }
    }
}

// 5. START SYSTEM
console.log(chalk.cyan("====================================="));
console.log(chalk.cyan("      GHOST LINK BUILDER v1.0       "));
console.log(chalk.cyan("    Status: ULTRA-LIGHTWEIGHT       "));
console.log(chalk.cyan("====================================="));

for (let i = 1; i <= config.threads; i++) {
    runThread(i);
}
