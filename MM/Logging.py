import logging
import datetime
import sys, traceback
logger=logging.getLogger(__name__)


def logError(message):
    exc_type, exc_value, exc_traceback = message
    logger.error(datetime.datetime.now())
    logger.error("-->")
    logger.error(repr(traceback.format_exception(exc_type, exc_value,exc_traceback)))



def logWarning(message):
    exc_type, exc_value, exc_traceback = message
    logger.warning(datetime.datetime.now())
    logger.warning("-->")
    logger.warning(repr(traceback.format_exception(exc_type, exc_value,exc_traceback)))


def logInfo(message):
    exc_type, exc_value, exc_traceback = message
    logger.info(datetime.datetime.now())
    logger.info("-->")
    logger.info(repr(traceback.format_exception(exc_type, exc_value,exc_traceback)))

def logMessage(message):
    logger.error(datetime.datetime.now())
    logger.error("-->")
    logger.error(message)