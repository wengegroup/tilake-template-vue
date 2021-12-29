let tool = null;

/* @target 日期对象转字符串
 * @example 年-月-日 时:分:秒:毫秒
 * 		yyyy-MM-dd HH:mm:ss:SSS → 2018-08-08 08:08:08:888
 * 		yy-M-d H:m:s → 18-8-8 8:8:8
 * @param day : 目标日期
 * @param split : 分隔符,不传默认.号
 * @return 日期字符串
 */
export function DateToString(day, format) {
  var year = day.getFullYear();
  var month = day.getMonth() + 1;
  var date = day.getDate();
  var hour = day.getHours();
  var hour12 = (hour > 12 ? hour - 12 : hour);
  hour12 = (hour12 == 0 ? 12 : hour12);
  var minute = day.getMinutes();
  var second = day.getSeconds();
  var milliSecond = day.getMilliseconds();

  return format.replace("yyyy", year)
    .replace("yy", new String(year).substring(2))
    .replace("MM", month < 10 ? "0" + month : month)
    .replace("M", month)
    .replace("dd", date < 10 ? "0" + date : date)
    .replace("d", date)
    .replace("hh", hour12 < 10 ? "0" + hour12 : hour12)
    .replace("h", hour12)
    .replace("HH", hour < 10 ? "0" + hour : hour)
    .replace("H", hour)
    .replace("mm", minute < 10 ? "0" + minute : minute)
    .replace("m", minute)
    .replace("ss", second < 10 ? "0" + second : second)
    .replace("s", second)
    .replace("SSS", milliSecond);
}

/* @target 计算当前日期减目标日期相差几年几月几天
 * @param someDay : 目标日期(字符串或日期对象)
 * @return "xx岁xx月xx天"
 */
export function minusDate(someDay) {
  if (!someDay) {
    return "";
  }
  someDay = new Date(someDay);
  var date = new Date();
  //当前年月日减该日期年月日
  var y = date.getFullYear() - someDay.getFullYear();
  var m = date.getMonth() - someDay.getMonth();
  var d = date.getDate() - someDay.getDate();
  //日期或月份为负数则向前借位
  if (d < 0) {
    m--;
    d += 30
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  return y + "岁" + m + "月";

}

/**
 * 日期相差天数
 */
export function DaySpan(date1, date2) {
  if (!date1 || !date2) {
    return 0;
  }
  //相差天数 = 相差毫秒数 / 比例
  let d = (new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24);
  return Math.abs(d);
}

/**
 * 时间跨度 单位月份
 * @param {Object} time1 日期1
 * @param {Object} time2 日期2
 */
export function TimeSpan(time1, time2) {
  if (!time1 || !time2) {
    return 0;
  }
  time1 = new Date(time1);
  time2 = new Date(time2);
  //相差月份数
  let m = (time2.getFullYear() - time1.getFullYear()) * 12 + (time2.getMonth() - time1.getMonth());
  return Math.abs(m);
}

/**
 * 计算结束时刻
 * starttime 开始时刻
 * timespan 相差分钟数
 */
export function calculEndTime(starttime, timespan) {

  let starthour = starttime.split(':')[0];
  let startmin = starttime.split(':')[1];
  starthour = Number(starthour.at(0) == 0 ? starthour.at(1) : starthour);
  startmin = Number(startmin.at(0) == 0 ? startmin.at(1) : startmin);
  startmin = startmin + timespan;
  let addhour = parseInt(startmin / 60) < 0 ? 0 : parseInt(startmin / 60);
  let addmin = startmin % 60;
  let endhour = starthour + addhour;

  let endmin = addmin;
  endhour = endhour <= 9 ? '0' + endhour : endhour;
  endmin = endmin <= 9 ? '0' + endmin : endmin;
  let endtime = endhour + ":" + endmin;

  return endtime;
}

/**
 * 将小时分成分钟数 格式例如:08:00
 */
export function hourConversionMin(h) {
  if (h == "" || h == null) return 0;
  let hour = h.split(':')[0];
  let min = h.split(':')[1];
  hour = Number(hour.at(0) == 0 ? hour.at(1) : hour);
  min = Number(min.at(0) == 0 ? min.at(1) : min);
  let resultmin = hour * 60 + min;

  return resultmin;

}

/**
 * 根据日期计算出星期
 */
export function getWeek(datestr) {
  if (datestr == "") return;
  let day = new Date(datestr).getDay();
  let weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekList[day];
}

/**
 * @target 获取当日、本周、本月、当年的起止时间
 * @param type:-1:当前时间 1:当日；2:本周；3:本月；4:当年 21:近7天
 * @return：{startTime:'2019-04-17 00:00:00',endTime:'2019-04-17 23:59:59',now:''}
 */
export function getTimeObjByType(type) {
  let now = new Date();

  let result = {
    startTime: '',
    endTime: '',
    now: ''
  };
  switch (type) {
    case -1: { //当前时间
      result.now = DateToString(now, "yyyy-MM-dd HH:mm:ss");
      break;
    }
    case 1: { //本日
      result.startTime = DateToString(now, "yyyy-MM-dd 00:00:00");
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 31: { //昨日
      now.setDate(now.getDate() - 1);
      result.startTime = DateToString(now, "yyyy-MM-dd 00:00:00");
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 2: { //本周
      let num = now.getDay() || 7;
      now.setDate(now.getDate() - num + 1);
      result.startTime = DateToString(now, "yyyy-MM-dd 00:00:00");
      now.setDate(now.getDate() + 6);
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 32: { //上周
      let num = now.getDay() || 7;
      now.setDate(now.getDate() - num + 1 - 7);
      result.startTime = DateToString(now, "yyyy-MM-dd 00:00:00");
      now.setDate(now.getDate() + 6);
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 3: { //本月
      now.setMonth(now.getMonth() + 1, 0);
      result.startTime = DateToString(now, "yyyy-MM-01 00:00:00");
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 33: { //上月
      now.setMonth(now.getMonth(), 0);
      result.startTime = DateToString(now, "yyyy-MM-01 00:00:00");
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      break;
    }
    case 4: { //本年
      result.startTime = DateToString(now, "yyyy-01-01 00:00:00");
      result.endTime = DateToString(now, "yyyy-12-31 23:59:59");
      break;
    }
    case 34: { //上年
      now.setFullYear(now.getFullYear() - 1);
      result.startTime = DateToString(now, "yyyy-01-01 00:00:00");
      result.endTime = DateToString(now, "yyyy-12-31 23:59:59");
      break;
    }
    case 21: { //近七天
      result.endTime = DateToString(now, "yyyy-MM-dd 23:59:59");
      now.setDate(now.getDate() - 6);
      result.startTime = DateToString(now, "yyyy-MM-dd 00:00:00");
      break;
    }
  }
  return result;
}

/**
 * @target 比较日期大小
 * @param date1：比较日期 date2：被比较日期 （格式：YYYY-MM-DD）
 * @return：前者是否大于后者
 */
export function compareDate(date1, date2) {
  return new Date(date1) > new Date(date2)
}

