/**
 * EMAIL SCHEDULER - Google Apps Script
 * Mengirim email terjadwal otomatis tanpa perlu browser terbuka
 * Berjalan 24/7 di server Google Cloud
 */

// ============================================
// KONFIGURASI
// ============================================

var SHEET_NAME = 'Scheduled Emails';
var CHECK_INTERVAL_MINUTES = 10; // Cek setiap 10 menit

// ============================================
// SETUP SPREADSHEET
// ============================================

function setupSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'ID',
      'Email Tujuan',
      'Subject',
      'Pesan',
      'Waktu Kirim',
      'Status',
      'Dibuat Pada',
      'Terkirim Pada'
    ]);
    
    // Format header
    var headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setBackground('#667eea');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    
    // Freeze header
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    for (var i = 1; i <= 8; i++) {
      sheet.autoResizeColumn(i);
    }
    
    Logger.log('✅ Spreadsheet setup complete');
  }
  
  return sheet;
}

// ============================================
// TAMBAH EMAIL TERJADWAL
// ============================================

function scheduleEmail(emailData) {
  try {
    var sheet = setupSpreadsheet();
    var id = Utilities.getUuid();
    var now = new Date();
    
    sheet.appendRow([
      id,
      emailData.to,
      emailData.subject,
      emailData.message,
      new Date(emailData.scheduledTime),
      'Pending',
      now,
      ''
    ]);
    
    Logger.log('Email scheduled: ' + id);
    return {
      success: true,
      message: 'Email berhasil dijadwalkan!',
      id: id
    };
  } catch (error) {
    Logger.log('Error scheduling email: ' + error);
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

// ============================================
// CEK DAN KIRIM EMAIL
// ============================================

function checkAndSendEmails() {
  try {
    var sheet = setupSpreadsheet();
    var data = sheet.getDataRange().getValues();
    var now = new Date();
    var sentCount = 0;
    
    // Skip header row
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var id = row[0];
      var emailTo = row[1];
      var subject = row[2];
      var message = row[3];
      var scheduledTime = new Date(row[4]);
      var status = row[5];
      
      // Skip jika sudah terkirim atau dibatalkan
      if (status !== 'Pending') {
        continue;
      }
      
      // Cek apakah waktunya sudah tiba
      if (now >= scheduledTime) {
        try {
          // Kirim email
          GmailApp.sendEmail(emailTo, subject, message, {
            name: 'Email Scheduler',
            htmlBody: message.replace(/\n/g, '<br>')
          });
          
          // Update status
          sheet.getRange(i + 1, 6).setValue('Terkirim');
          sheet.getRange(i + 1, 8).setValue(new Date());
          
          // Highlight row
          var rowRange = sheet.getRange(i + 1, 1, 1, 8);
          rowRange.setBackground('#d4edda');
          
          sentCount++;
          Logger.log('Email sent: ' + id + ' to ' + emailTo);
        } catch (emailError) {
          Logger.log('Error sending email: ' + emailError);
          sheet.getRange(i + 1, 6).setValue('Error: ' + emailError.toString().substring(0, 50));
          
          var errorRange = sheet.getRange(i + 1, 1, 1, 8);
          errorRange.setBackground('#f8d7da');
        }
      }
    }
    
    Logger.log('Check completed. Sent: ' + sentCount + ' emails');
    return sentCount;
  } catch (error) {
    Logger.log('Error in checkAndSendEmails: ' + error);
    return 0;
  }
}

// ============================================
// AMBIL DAFTAR EMAIL TERJADWAL
// ============================================

function getScheduledEmails() {
  try {
    var sheet = setupSpreadsheet();
    var data = sheet.getDataRange().getValues();
    var emails = [];
    
    // Skip header
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      emails.push({
        id: row[0],
        to: row[1],
        subject: row[2],
        message: row[3],
        scheduledTime: row[4].getTime(),
        status: row[5],
        createdAt: row[6].getTime(),
        sentAt: row[7] ? row[7].getTime() : null,
        rowIndex: i + 1
      });
    }
    
    // Sort by scheduled time
    emails.sort(function(a, b) {
      return a.scheduledTime - b.scheduledTime;
    });
    
    return {
      success: true,
      emails: emails
    };
  } catch (error) {
    Logger.log('Error getting emails: ' + error);
    return {
      success: false,
      message: error.toString(),
      emails: []
    };
  }
}

// ============================================
// BATALKAN EMAIL
// ============================================

function cancelEmail(emailId) {
  try {
    var sheet = setupSpreadsheet();
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === emailId) {
        sheet.getRange(i + 1, 6).setValue('Dibatalkan');
        
        var rowRange = sheet.getRange(i + 1, 1, 1, 8);
        rowRange.setBackground('#fff3cd');
        
        Logger.log('Email cancelled: ' + emailId);
        return {
          success: true,
          message: 'Email berhasil dibatalkan'
        };
      }
    }
    
    return {
      success: false,
      message: 'Email tidak ditemukan'
    };
  } catch (error) {
    Logger.log('Error cancelling email: ' + error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// ============================================
// KIRIM SEKARANG
// ============================================

function sendNow(emailId) {
  try {
    var sheet = setupSpreadsheet();
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === emailId) {
        var emailTo = data[i][1];
        var subject = data[i][2];
        var message = data[i][3];
        var status = data[i][5];
        
        if (status !== 'Pending') {
          return {
            success: false,
            message: 'Email sudah ' + status
          };
        }
        
        // Kirim email
        GmailApp.sendEmail(emailTo, subject, message, {
          name: 'Email Scheduler',
          htmlBody: message.replace(/\n/g, '<br>')
        });
        
        // Update status
        sheet.getRange(i + 1, 6).setValue('Terkirim');
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        var rowRange = sheet.getRange(i + 1, 1, 1, 8);
        rowRange.setBackground('#d4edda');
        
        Logger.log('Email sent immediately: ' + emailId);
        return {
          success: true,
          message: 'Email berhasil dikirim!'
        };
      }
    }
    
    return {
      success: false,
      message: 'Email tidak ditemukan'
    };
  } catch (error) {
    Logger.log('Error sending now: ' + error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// ============================================
// SETUP TRIGGER OTOMATIS
// ============================================

function setupTrigger() {
  // Hapus trigger lama
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'checkAndSendEmails') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Buat trigger baru - cek setiap 10 menit
  ScriptApp.newTrigger('checkAndSendEmails')
    .timeBased()
    .everyMinutes(CHECK_INTERVAL_MINUTES)
    .create();
  
  Logger.log('Trigger setup complete');
  return {
    success: true,
    message: 'Trigger berhasil dibuat! Email akan dicek setiap ' + CHECK_INTERVAL_MINUTES + ' menit.'
  };
}

// ============================================
// WEB APP - DO GET
// ============================================

function doGet(e) {
  try {
    var template = HtmlService.createTemplateFromFile('WebApp');
    return template.evaluate()
      .setTitle('Email Scheduler')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (error) {
    Logger.log('Error in doGet: ' + error);
    return HtmlService.createHtmlOutput(
      '<h1>Error</h1><p>' + error.toString() + '</p>'
    );
  }
}

// ============================================
// FUNGSI UNTUK DIPANGGIL DARI WEB APP
// ============================================

function processRequest(action, data) {
  try {
    switch(action) {
      case 'schedule':
        return scheduleEmail(data);
      case 'getList':
        return getScheduledEmails();
      case 'cancel':
        return cancelEmail(data.id);
      case 'sendNow':
        return sendNow(data.id);
      case 'setupTrigger':
        return setupTrigger();
      default:
        return { success: false, message: 'Invalid action: ' + action };
    }
  } catch (error) {
    Logger.log('Error in processRequest: ' + error);
    return { success: false, message: error.toString() };
  }
}

// ============================================
// FUNGSI TESTING
// ============================================

function testSendEmail() {
  var testData = {
    to: Session.getActiveUser().getEmail(),
    subject: 'Test Email dari Scheduler',
    message: 'Ini adalah test email. Jika Anda menerima ini, berarti sistem berfungsi dengan baik!',
    scheduledTime: new Date().getTime() + (60 * 60 * 1000) // 1 jam dari sekarang
  };
  
  var result = scheduleEmail(testData);
  Logger.log(result);
  
  return result;
}

// Menu custom di Spreadsheet
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📧 Email Scheduler')
    .addItem('⚙️ Setup Trigger', 'setupTrigger')
    .addItem('🔍 Cek & Kirim Sekarang', 'checkAndSendEmails')
    .addItem('🧪 Test Email', 'testSendEmail')
    .addToUi();
}





